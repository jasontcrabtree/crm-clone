using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("api/connections")]
public class ConnectionController : ControllerBase
{
    private readonly IConnectionService _connectionService;

    public ConnectionController(IConnectionService connectionService)
    {
        _connectionService = connectionService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var connections = await _connectionService.GetAllConnections(pageNumber, pageSize);
        return Ok(new { data = connections });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] ConnectionModel model)
    {
        try
        {
            var createdConnection = await _connectionService.CreateConnection(model);
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
        var connection = await _connectionService.GetConnectionById(id);
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
        var updatedConnection = await _connectionService.UpdateConnectionById(id, model);
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
        var connectionExists = await _connectionService.GetConnectionById(id);
        if (connectionExists == null)
        {
            return NotFound("Connection not found.");
        }

        await _connectionService.DeleteConnectionById(id);
        return NoContent();
    }

    [HttpGet("aggregate")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAllAggregate([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        var connections = await _connectionService.GetAllAggregateConnections(pageNumber, pageSize);
        return Ok(new { data = connections });
    }
}