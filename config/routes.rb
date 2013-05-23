require 'realtime_analytics'
BlogSse::Application.routes.draw do
  mount AnalyticsSSE => '/realtime-analytics'
  root to: 'analytics#index'
end
