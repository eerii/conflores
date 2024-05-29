use blog::{init_tracing, routes::router, shutdown_signal};
use tokio::net::TcpListener;
use tower_http::services::ServeDir;
use tracing::info;

#[tokio::main]
async fn main() {
    // Enable logging
    init_tracing();

    // Application routes
    let app = router().nest_service("/assets", ServeDir::new("assets/"));

    // Debug tools
    #[cfg(debug_assertions)]
    let app = {
        fn not_htmx<T>(req: &axum::http::Request<T>) -> bool {
            !req.headers().contains_key("hx-request")
        }
        app.layer(tower_livereload::LiveReloadLayer::new().request_predicate(not_htmx))
    };

    // Launch the server
    let listener = TcpListener::bind("0.0.0.0:3000").await.unwrap();

    info!("active server on http://{}", listener.local_addr().unwrap());

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .unwrap();
}
