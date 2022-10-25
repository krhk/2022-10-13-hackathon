using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace hackathon.Shared.Models;

public class Trip
{
    /// <summary>
    /// Startovní pozice
    /// </summary>
    public string StartPosX { get; set; }
    public string StartPosY { get; set; }

    /// <summary>
    /// Koncová pozice
    /// </summary>
    public double EndPosX { get; set; }
    public double EndPosY { get; set; }

    /// <summary>
    /// Kdy bude výlet
    /// </summary>
    public DateTime WhenDate { get; set; }

    /// <summary>
    /// Kdy začneme výlet
    /// </summary>
    public DateTime ToTrip {get; set;}

    /// <summary>
    /// Kdy odjíždíme z výletu
    /// </summary>
    public DateTime ComeBack { get; set; }

    [Key]
    public int Id { get; set; }

    public string Name { get; set; }
}
