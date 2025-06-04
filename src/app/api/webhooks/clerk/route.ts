import { addUser } from "@/actions/userAction";
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const evt = await verifyWebhook(req);

    // Do something with payload
    // For this guide, log payload to console
    const { id } = evt.data;
    const eventType = evt.type;
    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );
    console.log("Webhook payload:", evt.data);

    if (evt.type === "user.created") {
      const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data;

      const user = {
        clerkId: id,
        email: email_addresses[0].email_address,
        name: username,
        firstName: first_name,
        lastName: last_name,
        photo: image_url
      }

      await addUser(user);
          return NextResponse.json({message: "New user created", user}, { status: 200 });
    }
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
