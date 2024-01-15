using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("api/interactions")]

public class InteractionController : ControllerBase
{
    private readonly IInteractionService _interactionService;

    public InteractionController(IInteractionService interactionService)
    {
        _interactionService = interactionService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        int userId = User.GetUserId();
        var interactions = await _interactionService.GetAllInteractions(userId, pageNumber, pageSize);
        return Ok(new { data = interactions });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] InteractionModel model)
    {
        int userId = User.GetUserId();
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
        var orgnisation = await _interactionService.GetInteractionById(id);

        if (orgnisation == null)
        {
            return NotFound("Interaction not found.");
        }
        return Ok(new { data = orgnisation });

    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] InteractionModel model)
    {
        var updatedInteraction = await _interactionService.UpdateInteractionById(id, model);
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
        var orgnisationExists = await _interactionService.GetInteractionById(id);
        if (orgnisationExists == null)
        {
            return NotFound("Interaction not found.");
        }

        await _interactionService.DeleteInteractionById(id);
        return NoContent();
    }
}