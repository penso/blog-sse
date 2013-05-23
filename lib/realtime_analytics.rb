class AnalyticsSSE < Sinatra::Base
  include Sinatra::SSE
  get '/' do
    sse_stream do |out|
      number = 0
      EM.add_periodic_timer(2) do
        number = 10 + rand(50)
        out.push :event => 'FOOBAR', :data => number.to_s
      end
    end
  end
end
