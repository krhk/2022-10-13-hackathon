using hackathon.Server.Api;
using hackathon.Shared.Models;
using Microsoft.AspNetCore.Mvc;

namespace hackathon.Server.Controllers;
public class ServiceController : ControllerBase
{
    private readonly ILogger<ServiceController> _logger;

    public ServiceController(ILogger<ServiceController> logger)
    {
        _logger = logger;
    }
    [HttpGet("getservicedata/{cacheKey}")]
    public List<ApiData> GetServiceData(string cacheKey)
    {
        return ApiBase.SetData(cacheKey);
    }

    [HttpGet("getallservicedata")]
    public Dictionary<string, List<ApiData>> GetAllServiceData()
    {
        return ApiBase.GetAllData();
    }
}