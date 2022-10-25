using hackathon.Shared.Models;
using Newtonsoft.Json;
using System.Collections;
using System.Runtime.Caching;

namespace hackathon.Server.Api;
public static class ApiBase
{
    static ObjectCache memoryCache = MemoryCache.Default;

    public static Dictionary<string, List<ApiData>> GetAllData() 
    {
        Dictionary<string, List<ApiData>> kv = new();
        IDictionaryEnumerator cacheEnumerator = (IDictionaryEnumerator)((IEnumerable)memoryCache).GetEnumerator();

        while (cacheEnumerator.MoveNext())
            kv[cacheEnumerator.Key.ToString()] = (List<ApiData>)cacheEnumerator.Value;
        return kv;
        
    }

    public static List<ApiData> SetData(string CacheKey, string? RequestUri = null)
    {
        List<ApiData>? apiDatas = new List<ApiData>();

        if (memoryCache.Get(CacheKey) != null && RequestUri == null)
            return (List<ApiData>)memoryCache.Get(CacheKey);
        
        List<ApiData> approxData = new List<ApiData>();
        using var httpClient = new HttpClient();
        using var HttpRequestMessage = new HttpRequestMessage(HttpMethod.Get, RequestUri);
        var response = httpClient.Send(HttpRequestMessage);
        using var responseStream = response.Content.ReadAsStream();
        using var streamReader = new StreamReader(responseStream);
        using var jsonReader = new JsonTextReader(streamReader);
        JsonSerializer serializer = new();
        try
        {
            var responseData = serializer.Deserialize<ResponseData>(jsonReader);
            if (responseData?.Features == null) new List<ApiData>();
            foreach (var data in responseData.Features)
            {
                var apiData = new ApiData()
                {
                    Name = data.Properties?.Nazev,
                    Destription = data.Properties?.Popis,
                    XPosition = (double)data.Properties.X,
                    YPosition = (double)data.Properties.Y,
                    BezBarier = data.Properties.BezBarier == "ano" ? true : false,
                    Id = int.Parse(data.Properties.DsId),
                };
                approxData.Add(apiData);
            }
            apiDatas = approxData;
            memoryCache.Set(CacheKey, apiDatas, new CacheItemPolicy()
            {
                AbsoluteExpiration = DateTime.Now.AddDays(7),
            });
        }
        catch(JsonReaderException ex)
        {
            throw;
        }
        return apiDatas;
    }
}
