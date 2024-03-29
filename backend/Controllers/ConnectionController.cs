using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("api/connections")]
public class ConnectionController : BaseController
{
    private readonly IConnectionService _connectionService;
    private readonly ILogger<ConnectionController> _logger;

    public ConnectionController(
        IConnectionService connectionService,
        InteractionLoggingService interactionLoggingService,
        ILogger<ConnectionController> logger
    ) : base(interactionLoggingService, logger)
    {
        _connectionService = connectionService;
        _logger = logger;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        int userId = GetUserId();
        var connections = await _connectionService.GetAllConnections(userId, pageNumber, pageSize);
        return Ok(new { data = connections });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] ConnectionModel model)
    {
        int userId = GetUserId();
        try
        {
            var createdConnection = await _connectionService.CreateConnection(model, userId);
            return CreatedAtAction(nameof(Get), new { id = createdConnection.Id }, new
            {
                message = "Connection created successfully",
                data = createdConnection
            });
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        int userId = GetUserId();
        var connection = await _connectionService.GetConnectionById(id, userId);
        if (connection == null)
        {
            return NotFound("Connection not found.");
        }
        return Ok(new { data = connection });

    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] ConnectionModel model)
    {
        int userId = GetUserId();
        var updatedConnection = await _connectionService.UpdateConnectionById(id, model, userId);
        if (updatedConnection == null)
        {
            return NotFound("Connection not found.");
        }

        return Ok(new { message = "Connection updated successfully", data = updatedConnection });
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        int userId = GetUserId();
        var connectionExists = await _connectionService.GetConnectionById(id, userId);
        if (connectionExists == null)
        {
            return NotFound("Connection not found.");
        }

        await _connectionService.DeleteConnectionById(id, userId);
        return NoContent();
    }

    [HttpGet("aggregate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllAggregate([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        int userId = User.GetUserId();

        var connections = await _connectionService.GetAllAggregateConnections(userId, pageNumber, pageSize);
        return Ok(new { data = connections });
    }
}