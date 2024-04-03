using Microsoft.AspNetCore.Mvc;
using backend.Models;

[ApiController]
[Route("api/organisations")]
public class OrganisationController : BaseController
{
    private readonly IOrganisationService _organisationService;

    public OrganisationController(IOrganisationService organisationService)
    {
        _organisationService = organisationService;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public async Task<IActionResult> GetAll([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 20)
    {
        int userId = User.GetUserId();
        // var organisations = await _organisationService.GetAllOrganisations(userId, pageNumber, pageSize);
        // return Ok(new { data = organisations });
        var (organisations, totalCount) = await _organisationService.GetAllOrganisations(userId, pageNumber, pageSize);
        return Ok(new { data = organisations, total = totalCount });
    }

    [HttpPost]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<IActionResult> Create([FromBody] OrganisationModel model)
    {
        int userId = User.GetUserId();
        if (await _organisationService.OrganisationExists(model.OrganisationName))
        {
            return BadRequest("Organisation already exists.");
        }

        var createdOrganisation = await _organisationService.CreateOrganisation(model, userId);
        return CreatedAtAction(nameof(Get),
        new
        {
            id = createdOrganisation.Id
        },
            new
            {
                message = "Organisation created successfully",
                data = createdOrganisation
            });
    }

    [HttpGet("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Get(int id)
    {
        int userId = User.GetUserId();
        var organisation = await _organisationService.GetOrganisationById(id, userId);

        if (organisation == null)
        {
            return NotFound("Organisation not found.");
        }
        return Ok(new { data = organisation });

    }

    [HttpPut("{id}")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Update(int id, [FromBody] OrganisationModel model)
    {
        int userId = User.GetUserId();
        var updatedOrganisation = await _organisationService.UpdateOrganisationById(id, model, userId);
        if (updatedOrganisation == null)
        {
            return NotFound("Organisation not found.");
        }

        return Ok(new { message = "Organisation updated successfully", data = updatedOrganisation });
    }

    [HttpDelete("{id}")]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> Delete(int id)
    {
        int userId = User.GetUserId();
        var organisationExists = await _organisationService.GetOrganisationById(id, userId);
        if (organisationExists == null)
        {
            return NotFound("Organisation not found.");
        }

        await _organisationService.DeleteOrganisationById(id, userId);
        return NoContent();
    }
}