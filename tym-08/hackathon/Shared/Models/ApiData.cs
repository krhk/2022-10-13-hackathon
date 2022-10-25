namespace hackathon.Shared.Models;
public class ApiData
{
    /// <summary>
    /// Název
    /// </summary>
    public string? Name { get; set; }
    /// <summary>
    /// Pozice X
    /// </summary>
    public double XPosition { get; set; }
    /// <summary>
    /// Pozice Y
    /// </summary>
    public double YPosition { get; set; }
    /// <summary>
    /// Zda je bezbariérový přístup
    /// </summary>
    public bool BezBarier { get; set; }
    /// <summary>
    /// Popis
    /// </summary>
    public string? Destription { get; set; }
    /// <summary>
    /// ID - bere se z ds_id
    /// </summary>
    public int Id { get; set; }
}
