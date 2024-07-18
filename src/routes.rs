use std::time::Duration;

use askama::Template;
use axum::{
    extract::{MatchedPath, Path, Request},
    routing::get,
    Router,
};
use chrono::NaiveDate;
use gray_matter::{engine::TOML, Matter};
use serde::Deserialize;
use tower_http::{timeout::TimeoutLayer, trace::TraceLayer};
use tracing::warn;

use crate::SharedState;

// -----------
// Page router
// -----------
pub fn router() -> Router {
    let state = SharedState::default();

    let api = Router::new().route("/ping", get(noop)).with_state(state);

    Router::new()
        .route("/", get(blog_list))
        .route("/blog/:slug", get(blog_post))
        .nest("/api", api)
        .layer((
            TraceLayer::new_for_http()
                .make_span_with(|req: &Request| {
                    let method = req.method();
                    let uri = req.uri();
                    let matched_path = req
                        .extensions()
                        .get::<MatchedPath>()
                        .map(|matched_path| matched_path.as_str());
                    tracing::debug_span!("request", %method, %uri, matched_path)
                })
                .on_failure(()),
            TimeoutLayer::new(Duration::from_secs(10)),
        ))
}

// ----
// Blog
// ----

const BLOG_PATH: &str = "assets/blog";

// Article list
#[derive(Template)]
#[template(path = "pages/blog_list.html")]
pub struct TemplateBlogList {
    articles: Vec<(String, BlogPostData)>,
}

pub async fn blog_list() -> TemplateBlogList {
    let mut articles = vec![];

    // Gets the article list from the blog folder
    let Ok(dir) = std::fs::read_dir(BLOG_PATH) else {
        return TemplateBlogList { articles };
    };

    let mut dir: Vec<_> = dir.filter_map(|d| d.ok()).collect();
    dir.sort_by_key(|d| d.file_name().into_string().unwrap_or_default());
    dir.reverse();

    for d in dir {
        let Ok(name) = d.file_name().into_string() else {
            continue;
        };
        if !name.ends_with(".md") {
            continue;
        }

        // Read the file and process the frontmatter to get the title
        let Ok(content) = std::fs::read_to_string(d.path()) else {
            continue;
        };
        let Some(matter) = Matter::<TOML>::new().parse(&content).data else {
            continue;
        };

        // If it is not ready to be published, hide it
        if let Ok(data) = matter.as_hashmap() {
            if !data.contains_key("published") {
                continue;
            }

            let slug = name.trim_end_matches(".md").to_string();
            articles.push((slug, matter.deserialize().unwrap_or_default()));
        }
    }

    TemplateBlogList { articles }
}

// Article body
#[derive(Template)]
#[template(path = "pages/blog_post.html")]
pub struct TemplateBlogPost {
    data: BlogPostData,
    body: Option<String>,
}

#[derive(Deserialize, Default)]
struct BlogPostData {
    title: String,
    published: Option<NaiveDate>,
    tags: Vec<String>,
}

pub async fn blog_post(Path(slug): Path<String>) -> TemplateBlogPost {
    let Ok(body) = std::fs::read_to_string(format!("{}/{}.md", BLOG_PATH, slug)) else {
        // TODO: Find a new way of rendering markdown since askama deprecated it
        return TemplateBlogPost {
            data: BlogPostData {
                title: "Blog post not found".into(),
                ..Default::default()
            },
            body: None,
        };
    };

    let mut data = BlogPostData::default();

    let matter = Matter::<TOML>::new().parse(&body);
    if let Some(matter) = matter.data.as_ref() {
        match matter.deserialize() {
            Ok(d) => data = d,
            Err(e) => {
                warn!("error when deserializing blog post data: {:?}", e);
            }
        }
    }

    TemplateBlogPost {
        data,
        body: Some(matter.content),
    }
}

// ---------------
// Other functions
// ---------------

// It doesn't do anything
async fn noop() {}
