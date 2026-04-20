<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 py-10 px-4 flex items-center justify-center">

    <div class="max-w-5xl w-full">

      <!-- CERTIFICAT -->
      <div id="certificat" class="relative bg-[#0b1a2d] rounded-2xl shadow-2xl overflow-hidden text-white">

        <!-- RUBANS OR SVG -->
        <svg class="absolute inset-0 w-full h-full" viewBox="0 0 800 600" preserveAspectRatio="none">
          <defs>
            <linearGradient id="gold" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fbbf24"/>
              <stop offset="50%" stop-color="#f59e0b"/>
              <stop offset="100%" stop-color="#d97706"/>
            </linearGradient>
            <linearGradient id="goldLight" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stop-color="#fef3c7"/>
              <stop offset="100%" stop-color="#fbbf24"/>
            </linearGradient>
          </defs>
          <path d="M0,0 C150,100 150,500 0,600 L100,600 C250,450 250,150 100,0 Z" fill="url(#gold)"/>
          <path d="M800,0 C650,100 650,500 800,600 L700,600 C550,450 550,150 700,0 Z" fill="url(#gold)"/>
          <!-- Motifs décoratifs sur les rubans -->
          <path d="M50,100 L80,80 L70,120 Z" fill="url(#goldLight)" opacity="0.5"/>
          <path d="M750,100 L720,80 L730,120 Z" fill="url(#goldLight)" opacity="0.5"/>
        </svg>

        <!-- COURONNE AU-DESSUS DE LA MÉDAILLE -->
        <div class="absolute left-6 top-1/2 -translate-y-1/2 -mt-16">
          <div class="crown-container">
            <i class="fas fa-crown text-3xl text-yellow-400 crown-icon"></i>
            <svg class="crown-svg" width="60" height="40" viewBox="0 0 60 40" fill="none">
              <path d="M10,35 L5,15 L15,25 L30,5 L45,25 L55,15 L50,35 Z" fill="url(#gold)" stroke="#b45309" stroke-width="1.5"/>
              <circle cx="30" cy="8" r="3" fill="#fef3c7"/>
              <circle cx="15" cy="20" r="2.5" fill="#fef3c7"/>
              <circle cx="45" cy="20" r="2.5" fill="#fef3c7"/>
            </svg>
          </div>
        </div>

        <!-- MÉDAILLE -->
        <div class="absolute left-6 top-1/2 -translate-y-1/2">
          <div class="w-28 h-28 rounded-full bg-gradient-to-br from-yellow-300 via-yellow-500 to-yellow-600 flex items-center justify-center shadow-xl medal-glow">
            <div class="w-20 h-20 bg-[#0b1a2d] rounded-full flex items-center justify-center text-center flex-col">
              <i class="fas fa-award text-yellow-400 text-xl mb-1"></i>
              <span class="text-xs text-yellow-400 font-bold">Best</span>
              <span class="text-xs text-yellow-400 font-bold">Award</span>
            </div>
          </div>
        </div>

        <!-- LOGO GRADUS AURA EN HAUT À DROITE -->
        <div class="absolute top-6 right-6 z-20 flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-md border border-yellow-500/30">
          <div class="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center">
            <i class="fas fa-graduation-cap text-white text-sm"></i>
          </div>
          <span class="text-sm font-bold text-yellow-400">Gradus Aura</span>
        </div>

        <!-- CONTENU -->
        <div class="relative z-10 p-10 text-center">

          <h1 class="text-4xl md:text-5xl font-bold tracking-widest" style="font-family: 'Georgia', serif;">CERTIFICAT</h1>
          <p class="text-yellow-400 tracking-widest mt-2">DE RÉUSSITE</p>

          <p class="mt-6 text-gray-300">Décerné à</p>

          <h2 class="text-3xl md:text-4xl text-yellow-400 border-b border-gray-500 inline-block mt-4">
            {{ nomEtudiant }}
          </h2>

          <p class="mt-6 max-w-xl mx-auto italic text-gray-200" style="font-family: 'Georgia', serif; font-style: italic; line-height: 1.6;">
            Ce certificat récompense les efforts exceptionnels, la persévérance et l'excellence démontrés tout au long du programme de formation. Votre dévouement, votre travail acharné et votre engagement sans faille vous ont permis d'atteindre des résultats remarquables. Nous vous félicitons chaleureusement pour cette brillante réussite et vous encourageons à poursuivre sur cette voie d'excellence.
          </p>

          <!-- FOOTER -->
          <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mt-10">

            <div>
              <input type="date" v-model="date" class="bg-transparent border-b border-yellow-500/50 w-full text-center text-white focus:border-yellow-400 outline-none">
              <p class="text-xs text-gray-400 mt-1">Date</p>
            </div>

            <div>
              <div @click="openSignatureModal" class="cursor-pointer">
                <div v-if="signatureImage" class="flex justify-center">
                  <img :src="signatureImage" class="h-10 mx-auto object-contain">
                </div>
                <div v-else class="text-gray-400 text-center border-b border-yellow-500/50 pb-1">Signer</div>
              </div>
              <p class="text-xs text-gray-400 mt-1">Signature</p>
            </div>

            <div>
              <input v-model="trainer" placeholder="Formateur" class="bg-transparent border-b border-yellow-500/50 w-full text-center text-white focus:border-yellow-400 outline-none">
              <p class="text-xs text-gray-400 mt-1">Formateur</p>
            </div>

            <div>
              <div @click="openStampModal" class="cursor-pointer">
                <div v-if="stampImage" class="flex justify-center">
                  <img :src="stampImage" class="w-12 h-12 mx-auto object-contain">
                </div>
                <div v-else class="text-gray-400 text-center border-b border-yellow-500/50 pb-1">Cachet</div>
              </div>
              <p class="text-xs text-gray-400 mt-1">Cachet</p>
            </div>

          </div>
        </div>

        <!-- Sceau décoratif en bas à droite -->
        <div class="absolute bottom-4 right-4 opacity-30">
          <i class="fas fa-certificate text-yellow-500 text-4xl"></i>
        </div>
      </div>

      <!-- BOUTONS EN DEHORS -->
      <div class="flex justify-center gap-4 mt-6">
        <button @click="generatePDF" :disabled="loading" class="bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-2 rounded-lg text-white font-semibold hover:shadow-lg transition-all transform hover:scale-105">
          <i class="fas fa-download mr-2"></i>{{ loading ? 'Génération...' : 'Télécharger' }}
        </button>
        <button @click="reset" class="border border-yellow-500/50 px-6 py-2 rounded-lg text-white hover:bg-yellow-500/10 transition-all">
          <i class="fas fa-redo mr-2"></i>Réinitialiser
        </button>
      </div>
    </div>

    <!-- SIGNATURE MODAL - COULEUR OR -->
    <div v-if="signatureModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" @click.self="signatureModal=false">
      <div class="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl shadow-2xl w-[500px] border-2 border-yellow-500">
        <div class="text-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <i class="fas fa-pen-fancy text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-yellow-800">Signature manuscrite</h3>
          <p class="text-sm text-yellow-600">Signez dans la zone ci-dessous</p>
        </div>
        <div class="border-2 border-yellow-400 rounded-lg overflow-hidden bg-white">
          <canvas 
            ref="canvas" 
            width="450" 
            height="150" 
            class="w-full cursor-crosshair"
            style="touch-action: none;"
            @mousedown="startDrawing"
            @mousemove="draw"
            @mouseup="stopDrawing"
            @mouseleave="stopDrawing"
            @touchstart="startDrawingTouch"
            @touchmove="drawTouch"
            @touchend="stopDrawing"
          ></canvas>
        </div>
        <div class="flex gap-3 mt-4 justify-center">
          <button @click="clearSignature" class="px-4 py-2 border border-yellow-400 rounded-lg text-yellow-700 hover:bg-yellow-100 transition">Effacer</button>
          <button @click="saveSignature" class="px-4 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition">Valider</button>
          <button @click="signatureModal=false" class="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">Fermer</button>
        </div>
      </div>
    </div>

    <!-- STAMP MODAL - COULEUR OR -->
    <div v-if="stampModal" class="fixed inset-0 bg-black/80 flex items-center justify-center z-50" @click.self="stampModal=false">
      <div class="bg-gradient-to-br from-yellow-50 to-amber-50 p-6 rounded-xl shadow-2xl w-[450px] border-2 border-yellow-500">
        <div class="text-center mb-4">
          <div class="w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-3 shadow-lg">
            <i class="fas fa-stamp text-white text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-yellow-800">Ajouter un cachet officiel</h3>
          <p class="text-sm text-yellow-600">Importez l'image du cachet (PNG, JPG)</p>
        </div>
        <div 
          class="border-2 border-dashed border-yellow-400 rounded-lg p-8 text-center cursor-pointer hover:bg-yellow-100 transition-all"
          @click="triggerStampUpload"
        >
          <i class="fas fa-cloud-upload-alt text-4xl text-yellow-500 mb-2"></i>
          <p class="text-yellow-700">Cliquez pour importer une image</p>
          <p class="text-xs text-yellow-500 mt-1">PNG, JPG (Max 2MB)</p>
          <input type="file" ref="stampInput" class="hidden" accept="image/*" @change="handleStampUpload">
        </div>
        <div v-if="stampPreview" class="mt-4 flex justify-center">
          <div class="relative">
            <img :src="stampPreview" class="w-24 h-24 object-contain border-2 border-yellow-400 rounded-lg p-2">
            <button @click="stampPreview=null; stampImage=null" class="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-xs hover:bg-red-600">✕</button>
          </div>
        </div>
        <div class="flex gap-3 mt-4">
          <button @click="confirmStamp" class="flex-1 py-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white rounded-lg hover:shadow-lg transition">Valider</button>
          <button @click="stampModal=false" class="flex-1 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition">Annuler</button>
        </div>
      </div>
    </div>

    <!-- TOAST -->
    <div v-if="toast" class="fixed bottom-6 right-6 bg-gradient-to-r from-yellow-500 to-yellow-600 text-white px-4 py-2 rounded-lg shadow-lg z-50 flex items-center gap-2">
      <i class="fas fa-check-circle"></i>
      {{ toastMessage }}
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const nomEtudiant = ref('')
const date = ref(new Date().toISOString().split('T')[0])
const trainer = ref('')

const signatureModal = ref(false)
const stampModal = ref(false)
const signatureImage = ref(null)
const stampImage = ref(null)
const stampPreview = ref(null)

const toast = ref(false)
const toastMessage = ref('')
const loading = ref(false)

const canvas = ref(null)
let ctx = null
let drawing = false

const stampInput = ref(null)

// Initialisation du canvas
const initCanvas = () => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    ctx.strokeStyle = '#b45309'
    ctx.lineWidth = 2
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  }
}

// Dessin souris
const startDrawing = (e) => {
  drawing = true
  const rect = canvas.value.getBoundingClientRect()
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x, y)
  ctx.stroke()
}

const draw = (e) => {
  if (!drawing) return
  const rect = canvas.value.getBoundingClientRect()
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height
  const x = (e.clientX - rect.left) * scaleX
  const y = (e.clientY - rect.top) * scaleY
  ctx.lineTo(x, y)
  ctx.stroke()
}

const stopDrawing = () => {
  drawing = false
  ctx.beginPath()
}

// Dessin tactile
const startDrawingTouch = (e) => {
  e.preventDefault()
  const touch = e.touches[0]
  const rect = canvas.value.getBoundingClientRect()
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height
  const x = (touch.clientX - rect.left) * scaleX
  const y = (touch.clientY - rect.top) * scaleY
  drawing = true
  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x, y)
  ctx.stroke()
}

const drawTouch = (e) => {
  e.preventDefault()
  if (!drawing) return
  const touch = e.touches[0]
  const rect = canvas.value.getBoundingClientRect()
  const scaleX = canvas.value.width / rect.width
  const scaleY = canvas.value.height / rect.height
  const x = (touch.clientX - rect.left) * scaleX
  const y = (touch.clientY - rect.top) * scaleY
  ctx.lineTo(x, y)
  ctx.stroke()
}

const clearSignature = () => {
  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.fillStyle = '#ffffff'
  ctx.fillRect(0, 0, canvas.value.width, canvas.value.height)
  ctx.beginPath()
}

const openSignatureModal = () => {
  signatureModal.value = true
  setTimeout(() => initCanvas(), 100)
}

const saveSignature = () => {
  signatureImage.value = canvas.value.toDataURL('image/png')
  signatureModal.value = false
  showToast('Signature ajoutée')
}

const openStampModal = () => {
  stampModal.value = true
}

const triggerStampUpload = () => {
  stampInput.value.click()
}

const handleStampUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    if (file.size > 2 * 1024 * 1024) {
      showToast('Fichier trop volumineux (max 2 Mo)')
      return
    }
    const reader = new FileReader()
    reader.onload = (e) => {
      stampPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const confirmStamp = () => {
  if (stampPreview.value) {
    stampImage.value = stampPreview.value
    showToast('Cachet ajouté')
  }
  stampModal.value = false
}

// Récupération du nom de l'étudiant
onMounted(() => {
  const user = localStorage.getItem('gradus_user')
  if (user) {
    try {
      const userData = JSON.parse(user)
      nomEtudiant.value = userData.fullname || userData.name || ''
    } catch (e) {
      console.error('Erreur', e)
    }
  }
})

const generatePDF = async () => {
  loading.value = true
  try {
    const el = document.getElementById('certificat')
    const canvasEl = await html2canvas(el, { scale: 3, backgroundColor: '#0b1a2d', useCORS: true })
    const pdf = new jsPDF('landscape', 'mm', 'a4')
    const imgWidth = 297
    const imgHeight = (canvasEl.height * imgWidth) / canvasEl.width
    pdf.addImage(canvasEl.toDataURL(), 'PNG', 0, 0, imgWidth, imgHeight)
    pdf.save(`Certificat_${nomEtudiant.value || 'Etudiant'}.pdf`)
    showToast('PDF téléchargé avec succès')
  } catch (error) {
    console.error('Erreur PDF:', error)
    showToast('Erreur lors de la génération')
  } finally {
    loading.value = false
  }
}

const reset = () => {
  date.value = new Date().toISOString().split('T')[0]
  trainer.value = ''
  signatureImage.value = null
  stampImage.value = null
  stampPreview.value = null
  showToast('Réinitialisé')
}

const showToast = (msg) => {
  toastMessage.value = msg
  toast.value = true
  setTimeout(() => toast.value = false, 3000)
}
</script>

<style scoped>
canvas {
  border: 1px solid #fbbf24;
  cursor: crosshair;
}

input[type="date"] {
  color-scheme: dark;
}

input::placeholder {
  color: #9ca3af;
}

/* Animation de la médaille */
.medal-glow {
  animation: medalPulse 2s infinite;
}

@keyframes medalPulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.4); }
  50% { box-shadow: 0 0 0 15px rgba(245, 158, 11, 0); }
}

/* Animation de la couronne */
.crown-container {
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: -15px;
  z-index: 10;
}

.crown-icon {
  position: absolute;
  top: -25px;
  left: 50%;
  transform: translateX(-50%);
  filter: drop-shadow(0 0 5px rgba(245, 158, 11, 0.5));
  animation: crownFloat 3s ease-in-out infinite;
}

.crown-svg {
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3));
}

@keyframes crownFloat {
  0%, 100% { transform: translateX(-50%) translateY(0); }
  50% { transform: translateX(-50%) translateY(-5px); }
}
</style>