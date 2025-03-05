
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    // Get request data
    const { name, email } = await req.json();

    // Validate inputs
    if (!name || !email) {
      throw new Error("Name and email are required");
    }

    // For now, just log the inquiry (since we don't have an email service set up)
    console.log(`CementED Inquiry - Name: ${name}, Email: ${email}`);

    // In a real implementation, you would integrate with an email service
    // like SendGrid, Mailgun, etc. For this example, we'll just simulate sending an email
    console.log(`Sending email to booking@gudecapital.com`);

    // Simulate success for this example
    const emailResult = { success: true, id: "simulated-email-id" };

    // Return success response
    return new Response(
      JSON.stringify({ success: true, emailId: emailResult.id }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing CementED inquiry:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
