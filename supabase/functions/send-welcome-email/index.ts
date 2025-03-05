
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.7.1";

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
    const { email, name } = await req.json();

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const supabase = createClient(supabaseUrl, supabaseKey);

    // In a real implementation, you would integrate with an email service
    // like SendGrid, Mailgun, etc. For this example, we'll just simulate sending an email
    console.log(`Sending welcome email to ${email} (${name})`);

    // Implement your email sending logic here
    // Example with a hypothetical email service:
    /*
    const emailApiKey = Deno.env.get("EMAIL_API_KEY") || "";
    const response = await fetch("https://api.emailservice.com/v1/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${emailApiKey}`
      },
      body: JSON.stringify({
        to: email,
        subject: "Welcome to ModuBot!",
        html: `
          <h1>Welcome to ModuBot, ${name}!</h1>
          <p>Thank you for signing up. We're excited to have you on board!</p>
          <p>With ModuBot, you can:</p>
          <ul>
            <li>Ask unlimited AI questions</li>
            <li>Access advanced AI models</li>
            <li>Enjoy priority response times</li>
          </ul>
          <p>Get started now by logging in to your account.</p>
        `
      })
    });
    
    const emailResult = await response.json();
    */

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
    console.error("Error sending welcome email:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 400,
      }
    );
  }
});
