<template>
  <div class="courses-module min-h-screen bg-slate-50 p-6">
    <div class="module-header flex justify-between items-center mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <i class="fas fa-book-open text-indigo-500 text-2xl"></i>
          Tous les cours
        </h2>
        <p class="text-slate-500 text-sm mt-1">Gérez les formations et cours disponibles sur la plateforme</p>
      </div>
      <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openCourseModal">
        <i class="fas fa-plus text-sm"></i> Ajouter un cours
      </button>
    </div>

    <!-- Statistiques -->
    <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Total cours</p>
          <p class="text-2xl font-bold text-indigo-600">{{ courses.length }}</p>
        </div>
        <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <i class="fas fa-book text-indigo-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Revenus totaux</p>
          <p class="text-2xl font-bold text-emerald-600">{{ totalRevenue }} F</p>
        </div>
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <i class="fas fa-euro-sign text-emerald-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Catégories</p>
          <p class="text-2xl font-bold text-amber-600">{{ uniqueCategoriesCount }}</p>
        </div>
        <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <i class="fas fa-layer-group text-amber-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Étudiants inscrits</p>
          <p class="text-2xl font-bold text-rose-600">2.8k</p>
        </div>
        <div class="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center">
          <i class="fas fa-users text-rose-500"></i>
        </div>
      </div>
    </div>

    <div class="table-controls flex flex-wrap justify-between items-center gap-4 bg-white p-4 rounded-xl shadow-sm mb-6">
      <div class="entries-select flex items-center gap-2">
        <label class="text-sm text-slate-600"><i class="fas fa-table-list mr-1"></i>Afficher</label>
        <select v-model="perPage" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </select>
        <label class="text-sm text-slate-600">entrées</label>
      </div>
      <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
        <i class="fas fa-search text-slate-400"></i>
        <input type="text" v-model="searchTerm" placeholder="Rechercher un cours..." class="bg-transparent border-none outline-none text-sm w-64">
      </div>
    </div>

    <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="data-table w-full">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-hashtag mr-1"></i>N°</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-image mr-1"></i>Miniature</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-heading mr-1"></i>Nom du cours</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-folder mr-1"></i>Catégorie</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-folder-open mr-1"></i>Sous-catégorie</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-tag mr-1"></i>Prix de vente</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-percent mr-1"></i>Prix promo</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="(course, idx) in paginatedCourses" :key="course.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-5 py-3 text-sm text-slate-600">{{ (currentPage - 1) * perPage + idx + 1 }}</td>
            <td class="px-5 py-3">
              <div class="thumbnail w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                <img v-if="course.thumbnail" :src="course.thumbnail" alt="thumbnail" class="w-full h-full object-cover">
                <div v-else class="thumbnail-placeholder text-slate-400"><i class="fas fa-image text-xl"></i></div>
              </div>
            </td>
            <td class="px-5 py-3 text-sm font-medium text-slate-800 max-w-xs truncate">{{ course.title }}</td>
            <td class="px-5 py-3">
              <span class="badge-category inline-flex items-center gap-1 bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full text-xs font-medium">
                <i class="fas fa-folder text-indigo-500 text-xs"></i> {{ course.category }}
              </span>
            </td>
            <td class="px-5 py-3 text-sm text-slate-600">{{ course.subcategory }}</td>
            <td class="px-5 py-3 text-sm font-semibold text-slate-800">{{ course.sellingPrice }} F</td>
            <td class="px-5 py-3 text-sm font-semibold text-emerald-600">{{ course.discountPrice }} F</td>
            <td class="px-5 py-3">
              <div class="actions flex items-center gap-2">
                <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editCourse(course)" title="Modifier">
                  <i class="fas fa-edit text-sm"></i>
                </button>
                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteCourse(course.id)" title="Supprimer">
                  <i class="fas fa-trash-alt text-sm"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedCourses.length === 0">
            <td colspan="8" class="px-5 py-8 text-center text-slate-400">
              <i class="fas fa-inbox text-4xl mb-2 block"></i>
              <p>Aucun cours trouvé</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
      <div class="text-sm text-slate-500">
        <i class="fas fa-chart-simple mr-1"></i>
        Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredCourses.length }} entrées
      </div>
      <div class="pagination flex gap-2">
        <button @click="prevPage" :disabled="currentPage === 1" 
          class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
          <i class="fas fa-chevron-left text-xs"></i> Précédent
        </button>
        <button v-for="p in totalPages" :key="p" @click="currentPage = p" 
          :class="['px-3 py-1.5 rounded-lg text-sm transition-colors', 
            currentPage === p ? 'bg-indigo-500 text-white' : 'border border-slate-300 hover:bg-slate-50']">
          {{ p }}
        </button>
        <button @click="nextPage" :disabled="currentPage === totalPages" 
          class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm hover:bg-slate-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1">
          Suivant <i class="fas fa-chevron-right text-xs"></i>
        </button>
      </div>
    </div>

    <!-- Modal Ajout/Modification Cours -->
    <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showCourseModal, 'flex': showCourseModal }" @click.self="closeCourseModal">
      <div class="modal-content bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
        <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <i class="fas fa-plus-circle text-indigo-500"></i>
            {{ editingCourse ? 'Modifier le cours' : 'Ajouter un cours' }}
          </h3>
          <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeCourseModal">&times;</button>
        </div>
        <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
          <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-heading text-indigo-500 mr-1"></i>Titre du cours</label>
              <input type="text" v-model="courseForm.title" placeholder="Ex: Ultimate AWS Certified..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-folder text-indigo-500 mr-1"></i>Catégorie</label>
              <select v-model="courseForm.category" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option v-for="cat in categories" :key="cat.id" :value="cat.name">{{ cat.name }}</option>
              </select>
            </div>
          </div>
          <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-folder-open text-indigo-500 mr-1"></i>Sous-catégorie</label>
              <select v-model="courseForm.subcategory" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option v-for="sub in subcategories" :key="sub.id" :value="sub.name">{{ sub.name }}</option>
              </select>
            </div>
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-chart-line text-indigo-500 mr-1"></i>Niveau</label>
              <select v-model="courseForm.level" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="debutant">Débutant</option>
                <option value="intermediaire">Intermédiaire</option>
                <option value="avance">Avancé</option>
              </select>
            </div>
          </div>
          <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-tag text-indigo-500 mr-1"></i>Prix de vente (€)</label>
              <input type="number" v-model="courseForm.sellingPrice" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-percent text-indigo-500 mr-1"></i>Prix promotionnel (€)</label>
              <input type="number" v-model="courseForm.discountPrice" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
          </div>
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-align-left text-indigo-500 mr-1"></i>Description courte</label>
            <textarea v-model="courseForm.shortDescription" rows="2" placeholder="Brève description du cours..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
          </div>
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-file-alt text-indigo-500 mr-1"></i>Description complète</label>
            <textarea v-model="courseForm.fullDescription" rows="3" placeholder="Description détaillée..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
          </div>
          <div class="form-group">
            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-image text-indigo-500 mr-1"></i>Image du cours</label>
            <input type="file" @change="onCourseImageChange" accept="image/*" class="w-full px-4 py-2 border border-slate-300 rounded-lg file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100">
            <div class="image-preview mt-3" v-if="courseForm.imagePreview">
              <img :src="courseForm.imagePreview" alt="Aperçu" class="w-32 h-24 object-cover rounded-lg border border-slate-200 shadow-sm">
            </div>
          </div>
        </div>
        <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
          <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="closeCourseModal">
            <i class="fas fa-times"></i> Annuler
          </button>
          <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveCourse">
            <i class="fas fa-save"></i> Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleCours',
  props: { 
    categories: { type: Array, default: () => [] },
    subcategories: { type: Array, default: () => [] }
  },
  data() {
    return {
      searchTerm: '',
      perPage: 10,
      currentPage: 1,
      showCourseModal: false,
      editingCourse: null,
      courseForm: {
        title: '', category: '', subcategory: '', level: 'debutant',
        sellingPrice: '', discountPrice: '', shortDescription: '',
        fullDescription: '', image: null, imagePreview: null
      },
      // 10 exemples de cours avec images
      courses: [
        { id: 1, title: 'Ultimate AWS Certified Solutions Architect Associate 2025', category: 'Development', subcategory: 'Cloud', sellingPrice: 70, discountPrice: 60, thumbnail: 'https://picsum.photos/id/0/100/100', level: 'avance' },
        { id: 2, title: 'The Complete 2024 Web Development Bootcamp', category: 'Development', subcategory: 'Web Development', sellingPrice: 60, discountPrice: 55, thumbnail: 'https://picsum.photos/id/1/100/100', level: 'debutant' },
        { id: 3, title: 'The Ultimate React Course 2024: React, Next.js, Redux and More', category: 'Development', subcategory: 'Web Development', sellingPrice: 1000, discountPrice: 800, thumbnail: 'https://picsum.photos/id/2/100/100', level: 'intermediaire' },
        { id: 4, title: 'Laravel 11 - Build a Complete Learning Management System LMS', category: 'Development', subcategory: 'PHP', sellingPrice: 1200, discountPrice: 1000, thumbnail: 'https://picsum.photos/id/3/100/100', level: 'avance' },
        { id: 5, title: 'Python for Data Science and Machine Learning', category: 'Data Science', subcategory: 'Python', sellingPrice: 90, discountPrice: 75, thumbnail: 'https://picsum.photos/id/4/100/100', level: 'intermediaire' },
        { id: 6, title: 'UI/UX Design Masterclass with Figma', category: 'Design', subcategory: 'UI/UX', sellingPrice: 85, discountPrice: 65, thumbnail: 'https://picsum.photos/id/5/100/100', level: 'debutant' },
        { id: 7, title: 'Digital Marketing Strategy 2024', category: 'Marketing', subcategory: 'Digital Marketing', sellingPrice: 75, discountPrice: 60, thumbnail: 'https://picsum.photos/id/6/100/100', level: 'debutant' },
        { id: 8, title: 'Blockchain and Cryptocurrency Fundamentals', category: 'Blockchain', subcategory: 'Cryptocurrency', sellingPrice: 95, discountPrice: 80, thumbnail: 'https://picsum.photos/id/7/100/100', level: 'debutant' },
        { id: 9, title: 'Project Management Professional (PMP) Prep', category: 'Business', subcategory: 'Management', sellingPrice: 150, discountPrice: 120, thumbnail: 'https://picsum.photos/id/8/100/100', level: 'avance' },
        { id: 10, title: 'Cybersecurity Fundamentals', category: 'Security', subcategory: 'Cyber Security', sellingPrice: 80, discountPrice: 65, thumbnail: 'https://picsum.photos/id/9/100/100', level: 'intermediaire' }
      ]
    }
  },
  computed: {
    totalRevenue() {
      return this.courses.reduce((sum, c) => sum + (c.discountPrice || c.sellingPrice), 0)
    },
    uniqueCategoriesCount() {
      const categories = [...new Set(this.courses.map(c => c.category))]
      return categories.length
    },
    filteredCourses() {
      if (!this.searchTerm) return this.courses
      return this.courses.filter(c => c.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
    },
    paginatedCourses() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredCourses.slice(start, start + this.perPage)
    },
    totalPages() { 
      return Math.ceil(this.filteredCourses.length / this.perPage) || 1
    },
    startEntry() { 
      return this.filteredCourses.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1 
    },
    endEntry() { 
      return Math.min(this.currentPage * this.perPage, this.filteredCourses.length) 
    }
  },
  watch: { 
    searchTerm() { 
      this.currentPage = 1 
    },
    perPage() {
      this.currentPage = 1
    }
  },
  methods: {
    prevPage() { 
      if (this.currentPage > 1) this.currentPage-- 
    },
    nextPage() { 
      if (this.currentPage < this.totalPages) this.currentPage++ 
    },
    openCourseModal(course = null) {
      this.editingCourse = course
      if (course) {
        this.courseForm = { 
          ...course, 
          imagePreview: course.thumbnail,
          level: course.level || 'debutant'
        }
      } else {
        this.courseForm = { 
          title: '', category: '', subcategory: '', level: 'debutant',
          sellingPrice: '', discountPrice: '', shortDescription: '', 
          fullDescription: '', image: null, imagePreview: null 
        }
      }
      this.showCourseModal = true
    },
    closeCourseModal() { 
      this.showCourseModal = false 
    },
    onCourseImageChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.courseForm.image = file
        const reader = new FileReader()
        reader.onload = (e) => { 
          this.courseForm.imagePreview = e.target.result 
        }
        reader.readAsDataURL(file)
      }
    },
    saveCourse() {
      if (this.editingCourse) {
        const index = this.courses.findIndex(c => c.id === this.editingCourse.id)
        if (index !== -1) {
          this.courses[index] = { 
            ...this.courses[index], 
            ...this.courseForm, 
            thumbnail: this.courseForm.imagePreview || this.courses[index].thumbnail 
          }
        }
        alert('Cours modifié avec succès')
      } else {
        const newCourse = { 
          id: Date.now(), 
          ...this.courseForm, 
          thumbnail: this.courseForm.imagePreview || 'https://picsum.photos/id/10/100/100'
        }
        this.courses.push(newCourse)
        alert('Cours ajouté avec succès')
      }
      this.closeCourseModal()
    },
    editCourse(course) { 
      this.openCourseModal(course) 
    },
    deleteCourse(id) {
      if (confirm('Supprimer ce cours ?')) {
        this.courses = this.courses.filter(c => c.id !== id)
        alert('Cours supprimé avec succès')
      }
    }
  }
}
</script>

<style scoped>
/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.courses-module {
  animation: fadeIn 0.3s ease;
}

.stats-grid .stat-card,
.table-controls,
.table-responsive,
.pagination-area {
  animation: fadeInUp 0.3s ease-out;
}

/* Scrollbar personnalisée */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f5f9;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 10px;
}

::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Transition pour les boutons */
button {
  transition: all 0.2s ease;
}

button:active {
  transform: scale(0.96);
}

/* Ligne de séparation du tableau */
.data-table tbody tr {
  border-bottom: 1px solid #f1f5f9;
}

.data-table tbody tr:last-child {
  border-bottom: none;
}

/* Effet de survol des lignes */
.data-table tbody tr:hover {
  background: linear-gradient(90deg, #f8fafc, #ffffff);
}

/* Modal animation */
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

/* Focus styles */
input:focus, select:focus, textarea:focus {
  outline: none;
  ring: 2px solid #6366f1;
}

/* File input styling */
::file-selector-button {
  transition: all 0.2s ease;
  cursor: pointer;
}

::file-selector-button:hover {
  background-color: #e0e7ff;
}
</style>