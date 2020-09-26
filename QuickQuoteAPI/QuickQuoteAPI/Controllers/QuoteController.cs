using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Amazon;
using Amazon.Rekognition;
using Amazon.Rekognition.Model;
using Amazon.Runtime;
using Amazon.S3;
using Amazon.S3.Transfer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QuickQuoteAPI.Models;
using QuickQuoteAPI.ViewModels;

namespace QuickQuoteAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class QuoteController : ControllerBase
    {
        private readonly QuickQuoteContext _context;

        public QuoteController(QuickQuoteContext context)
        {
            _context = context;
        }

        // GET: api/Quote
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Quote>>> GetQuote()
        {
            return await _context.Quote.ToListAsync();
        }

        // GET: api/Quote/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Quote>> GetQuote(int id)
        {
            var quote = await _context.Quote.FindAsync(id);

            if (quote == null)
            {
                return NotFound();
            }

            return quote;
        }

        // PUT: api/Quote/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutQuote(int id, Quote quote)
        {
            if (id != quote.QuoteID)
            {
                return BadRequest();
            }

            _context.Entry(quote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!QuoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Quote
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<Quote>> PostQuote(Quote quote)
        {
            _context.Quote.Add(quote);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetQuote", new { id = quote.QuoteID }, quote);
        }

        [HttpPost("[action]")]
        //[Route("[action]")]
        //public async Task<ActionResult<FileVM>> PostImage(FileVM UploadedImage)
        public async Task<IActionResult> PostImage(FileVM UploadedImage)
        {

            byte[] bytes = Convert.FromBase64String(UploadedImage.FileAsBase64);

            var credentials = new BasicAWSCredentials("AKIAYFOXPUFXRIBLXF4O", "kt30oEKBt35RZRxXD6rLRd2uxITL0aYX24qFXnox");

            var config = new AmazonS3Config
            {
                RegionEndpoint = Amazon.RegionEndpoint.USEast1
            };

            var image = new Image();

            using (var client = new AmazonS3Client(credentials, config ))
            {
                using (var newMemoryStream = new MemoryStream(bytes))
                {
                    //file.CopyTo(newMemoryStream);

                    var uploadRequest = new TransferUtilityUploadRequest
                    {
                        InputStream = newMemoryStream,
                        Key = UploadedImage.FileName,
                        BucketName = "quickquoteitem",
                        CannedACL = S3CannedACL.PublicRead
                    };

                    var fileTransferUtility = new TransferUtility(client);

                    try
                    {
                        await fileTransferUtility.UploadAsync(uploadRequest);
                    }
                    catch (Exception err)
                    {

                        throw err;
                    }

                    
                }
            }

            AmazonRekognitionClient rekognitionClient = new AmazonRekognitionClient(credentials , Amazon.RegionEndpoint.USEast1);

            DetectLabelsRequest detectlabelsRequest = new DetectLabelsRequest()
            {

                Image = new Image()
                {
                    S3Object = new S3Object()
                    {
                        Name = UploadedImage.FileName,
                        Bucket = "quickquoteitem"
                    },
                },
                MaxLabels = 10,
                MinConfidence = 75F

            };

            try
            {
                DetectLabelsResponse detectLabelsResponse =
                await rekognitionClient.DetectLabelsAsync(detectlabelsRequest);
                //Console.WriteLine("Detected labels for " + photo);
                foreach (Label label in detectLabelsResponse.Labels)
                    Console.WriteLine("{0}: {1}", label.Name, label.Confidence);
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }

            //return CreatedAtAction("GetQuote", new { id = quote.QuoteID }, quote);
            return Ok();
        }

        // DELETE: api/Quote/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Quote>> DeleteQuote(int id)
        {
            var quote = await _context.Quote.FindAsync(id);
            if (quote == null)
            {
                return NotFound();
            }

            _context.Quote.Remove(quote);
            await _context.SaveChangesAsync();

            return quote;
        }

        private bool QuoteExists(int id)
        {
            return _context.Quote.Any(e => e.QuoteID == id);
        }
    }
}
