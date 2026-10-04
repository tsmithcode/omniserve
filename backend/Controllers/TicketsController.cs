using Microsoft.AspNetCore.Mvc;

namespace OmniServe.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TicketsController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetActiveTickets()
        {
            var tickets = new[]
            {
                new { Id = "T-101", Customer = "Alice Smith", Issue = "Account Access", Priority = "High", Status = "Open" },
                new { Id = "T-102", Customer = "Bob Jones", Issue = "Billing Discrepancy", Priority = "Medium", Status = "In Progress" }
            };
            return Ok(tickets);
        }
    }
}