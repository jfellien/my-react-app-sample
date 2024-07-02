using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Azure.WebJobs;
using Microsoft.Azure.WebJobs.Extensions.Http;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace devCrowd.ReactSample;

public static class GetTickets
{
    [FunctionName(nameof(GetTickets))]
    public static IActionResult Run(
        [HttpTrigger(
            AuthorizationLevel.Anonymous, 
            nameof(HttpMethods.Get), 
            Route = "tickets")] 
        HttpRequest req,
        ILogger log)
    {
        log.LogInformation("C# HTTP trigger function processed a request.");

        List<Ticket> tickets = new () {
            new() {
                Name = "One Day Ticket",
                ValidFor = "one day",
                Price = 100,
                BookingLink = "https://pretix.eu"
            },
            new() {
                Name = "Two Day Ticket",
                ValidFor = "two days",
                Price = 200,
                BookingLink = "https://pretix.eu"
            }
        };
        
        return new OkObjectResult(tickets);
    }
}

public class Ticket{
    public string Name { get; set; }
    public string ValidFor { get; set; }
    public double Price { get; set; }
    public string BookingLink { get; set; }
}
