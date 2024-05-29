use std::collections::HashMap;

use askama::Template;
use axum::extract::Path;
use chrono::NaiveDate;
use gray_matter::{engine::TOML, Matter};
use serde::Deserialize;
use tracing::warn;

const BLOG_PATH: &str = "assets/blog";

// Article list

#[derive(Template)]
#[template(path = "pages/blog_list.html")]
pub struct TemplateBlogList {
    articles: HashMap<String, String>,
}

pub async fn blog_list() -> TemplateBlogList {
    let mut articles = HashMap::new();

    // Gets the article list from the blog folder
    let Ok(dir) = std::fs::read_dir(BLOG_PATH) else {
        return TemplateBlogList { articles };
    };

    for d in dir {
        let Ok(d) = d else { continue };
        let Ok(name) = d.file_name().into_string() else {
            continue;
        };
        if !name.ends_with(".md") {
            continue;
        }

        // Read the file and process the frontmatter to get the title
        // Leemos o arquivo e procesamos a frontmatter para obter o título
        let Ok(content) = std::fs::read_to_string(d.path()) else {
            continue;
        };
        let Some(matter) = Matter::<TOML>::new().parse(&content).data else {
            continue;
        };

        let slug = name.trim_end_matches(".md").to_string();
        let title = matter["title"].as_string().unwrap_or(slug.clone());

        articles.insert(title, slug);
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
