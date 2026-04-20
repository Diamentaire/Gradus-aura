<template>
  <footer class="bg-dark text-gray-300 py-12">
    <div class="container mx-auto px-5 lg:px-8">
      <div class="grid md:grid-cols-4 gap-8">
        <div>
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 gradient-bg rounded-lg flex items-center justify-center">
              <i class="fas fa-graduation-cap text-white text-sm"></i>
            </div>
            <span class="font-bold text-white text-xl">Gradus Aura</span>
          </div>
          <p class="mt-3 text-sm">Application intelligente de préparation aux concours – Cours, QCM, suivi et coaching IA.</p>
        </div>
        <div>
          <h4 class="font-bold text-white mb-3">Plateforme</h4>
          <ul class="space-y-2 text-sm">
            <li><router-link to="/concours" class="hover:text-white">Concours & examens</router-link></li>
            <li><router-link to="/formations" class="hover:text-white">Formations diplômantes</router-link></li>
            <li><router-link to="/ressources" class="hover:text-white">Bibliothèque de sujets</router-link></li>
            <li><router-link to="/dashboard" class="hover:text-white">Tableau de bord progrès</router-link></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-white mb-3">Ressources</h4>
          <ul class="space-y-2 text-sm">
            <li><a href="#" class="hover:text-white">Blog & conseils</a></li>
            <li><a href="#" class="hover:text-white">Aide & FAQ</a></li>
            <li><a href="#" class="hover:text-white">Webinaires gratuits</a></li>
          </ul>
        </div>
        <div>
          <h4 class="font-bold text-white mb-3">Contact</h4>
          <ul class="space-y-2 text-sm">
            <li><i class="fas fa-envelope mr-2"></i> support@gradusaura.com</li>
            <li><i class="fab fa-whatsapp mr-2"></i> +237 6XX XX XX XX</li>
          </ul>
          <div class="flex gap-4 mt-4 text-xl">
            <i class="fab fa-facebook hover:text-white cursor-pointer"></i>
            <i class="fab fa-linkedin hover:text-white cursor-pointer"></i>
            <i class="fab fa-instagram hover:text-white cursor-pointer"></i>
          </div>
        </div>
      </div>
      <div class="border-t border-gray-700 mt-10 pt-6 text-center text-xs text-gray-400">
        © {{ currentYear }} Gradus Aura – Tous droits réservés. Préparation concours & examens.
      </div>
    </div>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear();
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(135deg, #4F46E5 0%, #06B6D4 100%);
}

.bg-dark {
  background-color: #0F172A;
}
</style>
