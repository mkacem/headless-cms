<template>
  <UContainer>
    <UPageHero :title="title" :description="description" />

    <UPageSection>
      <div class="max-w-2xl mx-auto">
        <UCard>
          <template #header>
            <h2 class="text-xl font-semibold">Send us a message</h2>
            <p class="text-sm text-muted-foreground mt-1">
              We'll get back to you as soon as possible.
            </p>
          </template>

          <form ref="form" method="POST" @submit="submitForm">
            <input type="text" name="name" class="border-1 w-full mb-3 p-3" placeholder="name" required>
            <input type="email" name="email" class="border-1 w-full mb-3 p-3" placeholder="email" required>
            <textarea name="message" class="border-1 w-full mb-3 p-3" placeholder="message" required></textarea>
            <button type="submit" :disabled="disable">{{disable?'Submitting...':'Submit Form'}}</button>
          </form>

          <div v-if="submitted" class="mt-6">
            <UAlert icon="i-lucide-check-circle"  variant="outline" title="Message sent successfully!"
              description="Thank you for reaching out. We'll get back to you soon." />
          </div>

          <div v-if="error" class="mt-6">
            <UAlert icon="i-lucide-alert-circle"  variant="outline" title="Error sending message"
              :description="error" />
          </div>
        </UCard>

        <!-- Contact Information -->
        <div class="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-blue-100 rounded-lg">
                <UIcon name="i-lucide-mail" class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h3 class="font-semibold">Email</h3>
                <p class="text-sm text-muted-foreground">hello@example.com</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-green-100 rounded-lg">
                <UIcon name="i-lucide-phone" class="w-5 h-5 text-green-600" />
              </div>
              <div>
                <h3 class="font-semibold">Phone</h3>
                <p class="text-sm text-muted-foreground">+1 (555) 123-4567</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-purple-100 rounded-lg">
                <UIcon name="i-lucide-map-pin" class="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <h3 class="font-semibold">Address</h3>
                <p class="text-sm text-muted-foreground">123 Main St, City, State 12345</p>
              </div>
            </div>
          </UCard>

          <UCard>
            <div class="flex items-center gap-3">
              <div class="p-2 bg-orange-100 rounded-lg">
                <UIcon name="i-lucide-clock" class="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <h3 class="font-semibold">Hours</h3>
                <p class="text-sm text-muted-foreground">Mon-Fri 9AM-5PM</p>
              </div>
            </div>
          </UCard>
        </div>
      </div>
    </UPageSection>
  </UContainer>
</template>

<script setup lang="ts">

const title = 'Contact Us'
const description = 'Get in touch with us through our contact page.'

// Set SEO meta
useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
const form:any= ref<HTMLFormElement|null>(null);
const submitted = ref(false);
const error = ref<string | null>(null);
const disable = ref(false);

const submitForm = async (e: any) => {
  e.preventDefault();

  disable.value = true;
  error.value = null;
  const formData = new FormData(form.value);
  formData.append("access_key", "e69a5c0f-aa6b-463a-b511-cd678a4612f0");
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    const data = await response.json();

    if (response.ok) {
      alert("Success! Your message has been sent.");
      form.value.reset();
    } else {
      alert("Error: " + data.message);
    }

  } catch (error) {
    alert("Something went wrong. Please try again.");
  } finally {
    disable.value = false;
  }
}

</script>