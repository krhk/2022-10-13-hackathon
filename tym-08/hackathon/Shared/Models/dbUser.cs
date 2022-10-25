using System.ComponentModel.DataAnnotations;

namespace hackathon.Shared.Models;
public class dbUser
{

    [Key]
    [Required]
    public int Id { get; set; }

    /// <summary>
    /// Už. jméno uživatele
    /// </summary>
    
    public string Username { get; set; }

    /// <summary>
    /// Heslo uživatele
    /// </summary>
    public string Password { get; set; }

    /// <summary>
    /// Id uživatele
    /// </summary>
    public string UserId { get; set; }

    /// <summary>
    /// Výlety uživatele
    /// </summary>
    public List<Trip>? Trips { get; set; }

    public static string HashPass(string pass)
    {
        string hashedPass = BCrypt.Net.BCrypt.HashPassword(pass);
        return hashedPass;
    }

    public static bool ComparePass(string pass, dbUser user)
    {
        bool verified = BCrypt.Net.BCrypt.Verify(pass, user.Password);
        return verified;
    }
}
