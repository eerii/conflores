use std::time::Duration;

use axum::{
    extract::{MatchedPath, Request},
    routing::get,
    Router,
};
use tower_http::{timeout::TimeoutLayer, trace::TraceLayer};

use crate::SharedState;

mod pages;

// Page router

pub fn router() -> Router {
    let state = SharedState::default();

    let api = Router::new().with_state(state);

    Router::new()
        .route("/", get(pages::blog_list))
        .route("/blog/:slug", get(pages::blog_post))
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
