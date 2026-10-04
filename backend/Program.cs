using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();

var app = builder.Build();

app.UseCors("AllowAll");
app.UseAuthorization();
app.MapControllers();

// Executive ROI & Analytics Telemetry Endpoint
app.MapGet("/api/analytics", () => Results.Ok(new
{
    TotalTickets = 1842,
    DeflectedByAI = 1455,
    DeflectionRate = 78.9,
    CostSavedUSD = 29100.00,
    AvgResolutionSec = 3.8,
    SlaComplianceRate = 99.6,
    SentimentScore = 4.82,
    ActiveAgents = 12,
    QueueTimeAvg = "12s"
}));

// Dynamic AI Knowledge Base Policy Endpoint
app.MapGet("/api/policy", () => Results.Ok(new
{
    PolicyVersion = "2.4.0-Enterprise",
    Rules = new[]
    {
        new { Id = "RULE-101", Name = "Instant Deflection for Order Tracking", MaxAmount = 0, AutoApprove = true },
        new { Id = "RULE-102", Name = "Auto-Refund under $50 for VIP Tier", MaxAmount = 50, AutoApprove = true },
        new { Id = "RULE-103", Name = "Mandatory Human Escalation for Chargeback Threats", MaxAmount = 1000, AutoApprove = false }
    }
}));

app.Run("http://localhost:5002");
