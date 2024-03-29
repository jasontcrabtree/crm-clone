using Microsoft.AspNetCore.Mvc;
using backend.Models;
using Microsoft.Extensions.Logging;

[ApiController]
[Route("api/interactions")]
public class InteractionController : BaseController
{
    private readonly IInteractionService _interactionService;
    private readonly ILogger<InteractionController> _logger;

    public InteractionController(
        IInteractionService interactionService,
        InteractionLoggingService interactionLoggingService,
        ILogger<InteractionController> logger
    ) : base(interactionLoggingService, logger)
    {
        _interactionService = interactionService;
        _logger = logger;
    }


    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        int userId = GetUserId();
        var interactions = await _interactionService.GetAllInteractions(userId, pageNumber, pageSize);
        return Ok(new { data = interactions });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] InteractionModel model)
    {
        int userId = GetUserId();
        if (await _interactionService.InteractionExists(model.InteractionTitle))
        {
            return BadRequest("Interaction already exists.");
        }

        var createdInteraction = await _interactionService.CreateInteraction(model, userId);
        return CreatedAtAction(nameof(Get),
        new
        {
            id = createdInteraction.Id
        },
            new
            {
                message = "Interaction created successfully",
                data = createdInteraction
            });
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        int userId = GetUserId();
        var organisation = await _interactionService.GetInteractionById(id, userId);

        if (organisation == null)
        {
            return NotFound("Interaction not found.");
        }
        return Ok(new { data = organisation });

    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] InteractionModel model)
    {
        int userId = GetUserId();
        var updatedInteraction = await _interactionService.UpdateInteractionById(id, model, userId);
        if (updatedInteraction == null)
        {
            return NotFound("Interaction not found.");
        }

        return Ok(new { message = "Interaction updated successfully", data = updatedInteraction });
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        int userId = GetUserId();
        var organisationExists = await _interactionService.GetInteractionById(id, userId);
        if (organisationExists == null)
        {
            return NotFound("Interaction not found.");
        }

        await _interactionService.DeleteInteractionById(id, userId);
        return NoContent();
    }

    [HttpGet("entity/{entityType}/{entityId}")]
    public async Task<IActionResult> GetInteractionsForEntity(string entityType, int entityId)
    {
        int userId = GetUserId();
        var interactions = await _interactionService.GetUserInteractionsForEntityAsync(entityType, entityId, userId);
        return Ok(interactions);
    }

    [HttpGet("user/all")]
    public async Task<IActionResult> GetAllInteractionsForUser()
    {
        int userId = GetUserId();
        var interactions = await _interactionService.GetAllUserInteractionsAsync(userId);
        return Ok(interactions);
    }
}