use std::sync::Arc;

use tokio::{signal, sync::RwLock};
use tracing_subscriber::{
    fmt::{layer, time::OffsetTime},
    layer::SubscriberExt,
    util::SubscriberInitExt,
    EnvFilter,
};

pub mod routes;

// State

#[derive(Default)]
pub struct AppState {}

pub type SharedState = Arc<RwLock<AppState>>;

// Logs

pub fn init_tracing() {
    let timer = time::format_description::parse("[hour]:[minute]:[second]").unwrap_or_default();
    let offset = time::UtcOffset::current_local_offset().unwrap_or(time::UtcOffset::UTC);
    let timer = OffsetTime::new(offset, timer);
    let level = if cfg!(debug_assertions) {
        "blog=debug,tower_http=debug"
    } else {
        "blog=info,tower_http=info"
    };

    tracing_subscriber::registry()
        .with(EnvFilter::try_from_default_env().unwrap_or_else(|_| level.into()))
        .with(layer().compact().with_timer(timer))
        .init();
}

// Graceful shutdown

pub async fn shutdown_signal() {
    let ctrl_c = async {
        signal::ctrl_c()
            .await
            .expect("failed to install Ctrl+C handler");
    };

    #[cfg(unix)]
    let terminate = async {
        signal::unix::signal(signal::unix::SignalKind::terminate())
            .expect("failed to install signal handler")
            .recv()
            .await;
    };

    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
}
