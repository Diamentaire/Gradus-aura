<template>
  <div class="blog-module min-h-screen bg-slate-50 p-6">
    <div class="module-header flex justify-between items-center mb-8">
      <div>
        <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
          <i class="fas fa-blog text-indigo-500 text-2xl"></i> 
          Tous les articles
        </h2>
        <p class="text-slate-500 text-sm mt-1">Gérez les articles de blog et le contenu éditorial</p>
      </div>
      <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openArticleModal">
        <i class="fas fa-plus text-sm"></i> Ajouter un article
      </button>
    </div>

    <!-- Statistiques -->
    <div class="stats-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Total articles</p>
          <p class="text-2xl font-bold text-indigo-600">{{ articles.length }}</p>
        </div>
        <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
          <i class="fas fa-newspaper text-indigo-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Catégories</p>
          <p class="text-2xl font-bold text-emerald-600">{{ uniqueCategories.length }}</p>
        </div>
        <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
          <i class="fas fa-folder-open text-emerald-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Tags uniques</p>
          <p class="text-2xl font-bold text-amber-600">{{ uniqueTagsCount }}</p>
        </div>
        <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
          <i class="fas fa-tags text-amber-500"></i>
        </div>
      </div>
      <div class="stat-card bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
        <div>
          <p class="text-slate-500 text-sm">Auteurs</p>
          <p class="text-2xl font-bold text-rose-600">3</p>
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
      <div class="filter-group flex items-center gap-3">
        <i class="fas fa-filter text-slate-400"></i>
        <select v-model="filterCategory" class="px-3 py-1.5 border border-slate-300 rounded-lg text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
          <option value="">Toutes les catégories</option>
          <option value="Photographie">📷 Photographie</option>
          <option value="Business">💼 Business</option>
          <option value="Game Design">🎮 Game Design</option>
          <option value="Technology">💻 Technology</option>
          <option value="Marketing">📊 Marketing</option>
          <option value="Design">🎨 Design</option>
        </select>
      </div>
      <div class="table-search flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full">
        <i class="fas fa-search text-slate-400"></i>
        <input type="text" v-model="searchTerm" placeholder="Rechercher un article..." class="bg-transparent border-none outline-none text-sm w-64">
      </div>
    </div>

    <div class="table-responsive bg-white rounded-xl shadow-sm overflow-hidden">
      <table class="data-table w-full">
        <thead class="bg-slate-50 border-b border-slate-200">
          <tr>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-hashtag mr-1"></i>N°</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-image mr-1"></i>Miniature</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-heading mr-1"></i>Titre</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-folder mr-1"></i>Catégorie</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-tags mr-1"></i>Tags</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-calendar mr-1"></i>Créé</th>
            <th class="px-5 py-3 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider"><i class="fas fa-cog mr-1"></i>Actions</th>
          </tr>
        </thead>
        <tbody class="divide-y divide-slate-100">
          <tr v-for="(article, idx) in paginatedArticles" :key="article.id" class="hover:bg-slate-50 transition-colors">
            <td class="px-5 py-3 text-sm text-slate-600">{{ (currentPage - 1) * perPage + idx + 1 }}</td>
            <td class="px-5 py-3">
              <div class="thumbnail w-12 h-12 rounded-lg overflow-hidden bg-slate-100 flex items-center justify-center">
                <img v-if="article.image" :src="article.image" alt="thumbnail" class="w-full h-full object-cover">
                <div v-else class="thumbnail-placeholder text-slate-400"><i class="fas fa-image text-xl"></i></div>
              </div>
            </td>
            <td class="px-5 py-3 text-sm font-medium text-slate-800 max-w-xs">{{ article.title }}</td>
            <td class="px-5 py-3">
              <span class="badge-category inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium" :class="{
                'bg-indigo-100 text-indigo-700': article.category === 'Photographie',
                'bg-emerald-100 text-emerald-700': article.category === 'Business',
                'bg-amber-100 text-amber-700': article.category === 'Game Design',
                'bg-purple-100 text-purple-700': article.category === 'Technology',
                'bg-rose-100 text-rose-700': article.category === 'Marketing',
                'bg-cyan-100 text-cyan-700': article.category === 'Design'
              }">
                <i class="fas" :class="{
                  'fa-camera': article.category === 'Photographie',
                  'fa-chart-line': article.category === 'Business',
                  'fa-gamepad': article.category === 'Game Design',
                  'fa-microchip': article.category === 'Technology',
                  'fa-chart-simple': article.category === 'Marketing',
                  'fa-palette': article.category === 'Design'
                }"></i>
                {{ article.category }}
              </span>
            </td>
            <td class="px-5 py-3">
              <div class="tags flex flex-wrap gap-1.5">
                <span v-for="tag in article.tags.slice(0, 2)" :key="tag" class="tag inline-flex items-center gap-1 bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">
                  <i class="fas fa-tag text-[10px]"></i> {{ tag }}
                </span>
                <span v-if="article.tags.length > 2" class="tag bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full text-xs">+{{ article.tags.length - 2 }}</span>
              </div>
            </td>
            <td class="px-5 py-3">
              <div class="text-sm text-slate-600">{{ article.createdAt }}</div>
              <small class="text-xs text-slate-400 flex items-center gap-1"><i class="far fa-clock"></i> {{ article.createdRelative }}</small>
            </td>
            <td class="px-5 py-3">
              <div class="actions flex items-center gap-2">
                <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editArticle(article)" title="Modifier">
                  <i class="fas fa-edit text-sm"></i>
                </button>
                <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteArticle(article.id)" title="Supprimer">
                  <i class="fas fa-trash-alt text-sm"></i>
                </button>
              </div>
            </td>
          </tr>
          <tr v-if="paginatedArticles.length === 0">
            <td colspan="7" class="px-5 py-8 text-center text-slate-400">
              <i class="fas fa-inbox text-4xl mb-2 block"></i>
              <p>Aucun article trouvé</p>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="pagination-area flex flex-wrap justify-between items-center gap-4 mt-6">
      <div class="text-sm text-slate-500">
        <i class="fas fa-chart-simple mr-1"></i>
        Affichage de {{ startEntry }} à {{ endEntry }} sur {{ filteredArticles.length }} entrées
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

    <!-- Modal Article -->
    <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showArticleModal, 'flex': showArticleModal }" @click.self="closeArticleModal">
      <div class="modal-content bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
        <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
          <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
            <i class="fas fa-pen-fancy text-indigo-500"></i>
            {{ editingArticle ? 'Modifier l\'article' : 'Ajouter un article' }}
          </h3>
          <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeArticleModal">&times;</button>
        </div>
        <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-heading text-indigo-500 mr-1"></i>Titre de l'article</label>
            <input type="text" v-model="articleForm.title" placeholder="Titre de l'article..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
          </div>
          <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-folder text-indigo-500 mr-1"></i>Choisir la catégorie</label>
              <select v-model="articleForm.category" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                <option value="Photographie">📷 Photographie</option>
                <option value="Business">💼 Business</option>
                <option value="Game Design">🎮 Game Design</option>
                <option value="Technology">💻 Technology</option>
                <option value="Marketing">📊 Marketing</option>
                <option value="Design">🎨 Design</option>
              </select>
            </div>
            <div class="form-group">
              <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-tags text-indigo-500 mr-1"></i>Tags (séparés par des virgules)</label>
              <input type="text" v-model="articleForm.tagsInput" placeholder="Business, Event, Audio, Technology" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
            </div>
          </div>
          <div class="form-group mb-4">
            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-image text-indigo-500 mr-1"></i>Image de l'article</label>
            <input type="file" @change="onArticleImageChange" accept="image/*" class="w-full px-4 py-2 border border-slate-300 rounded-lg">
            <div class="image-preview mt-3" v-if="articleForm.imagePreview">
              <img :src="articleForm.imagePreview" alt="Aperçu" class="w-32 h-32 object-cover rounded-lg border border-slate-200 shadow-sm">
            </div>
          </div>
          <div class="form-group">
            <label class="block text-sm font-semibold text-slate-700 mb-2"><i class="fas fa-align-left text-indigo-500 mr-1"></i>Contenu</label>
            <textarea v-model="articleForm.content" rows="8" placeholder="Contenu de l'article..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
          </div>
        </div>
        <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
          <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="closeArticleModal">
            <i class="fas fa-times"></i> Annuler
          </button>
          <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveArticle">
            <i class="fas fa-save"></i> Enregistrer
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModuleBlog',
  data() {
    return {
      searchTerm: '',
      filterCategory: '',
      perPage: 10,
      currentPage: 1,
      showArticleModal: false,
      editingArticle: null,
      articleForm: { title: '', category: 'Photographie', tagsInput: '', content: '', image: null, imagePreview: null },
      // 10 exemples d'articles avec images
      articles: [
        { id: 1, title: 'The Secret to Managing Gen Z isn\'t as Mysterious as You Think', category: 'Photographie', tags: ['Business', 'Event', 'Leadership'], image: 'https://picsum.photos/id/20/200/150', createdAt: '2024-01-20', createdRelative: 'il y a 1 semaine' },
        { id: 2, title: 'How Managers Can Support Hybrid Workers\' Well-Being', category: 'Business', tags: ['Audio', 'Technology', 'Remote'], image: 'https://picsum.photos/id/26/200/150', createdAt: '2024-01-19', createdRelative: 'il y a 1 semaine' },
        { id: 3, title: '3 Myths About Innovation (and Why They\'re Harmful)', category: 'Game Design', tags: ['Software', 'Conference', 'Gaming'], image: 'https://picsum.photos/id/29/200/150', createdAt: '2024-01-18', createdRelative: 'il y a 1 semaine' },
        { id: 4, title: 'Les tendances du marketing digital en 2024', category: 'Marketing', tags: ['Marketing', 'SEO', 'Social Media'], image: 'https://picsum.photos/id/0/200/150', createdAt: '2024-01-25', createdRelative: 'il y a 5 jours' },
        { id: 5, title: 'Design UI/UX : Les principes fondamentaux', category: 'Design', tags: ['UI', 'UX', 'Figma', 'Design'], image: 'https://picsum.photos/id/10/200/150', createdAt: '2024-01-28', createdRelative: 'il y a 2 jours' },
        { id: 6, title: 'L\'intelligence artificielle dans l\'éducation', category: 'Technology', tags: ['AI', 'Education', 'Innovation'], image: 'https://picsum.photos/id/1/200/150', createdAt: '2024-01-30', createdRelative: 'hier' },
        { id: 7, title: 'Comment réussir son entretien d\'embauche', category: 'Business', tags: ['Career', 'Interview', 'Job'], image: 'https://picsum.photos/id/2/200/150', createdAt: '2024-01-22', createdRelative: 'il y a 9 jours' },
        { id: 8, title: 'Les secrets de la photographie de paysage', category: 'Photographie', tags: ['Photo', 'Landscape', 'Nature'], image: 'https://picsum.photos/id/15/200/150', createdAt: '2024-01-15', createdRelative: 'il y a 2 semaines' },
        { id: 9, title: 'Développer un jeu vidéo en solo : guide complet', category: 'Game Design', tags: ['GameDev', 'Unity', 'C#', 'Design'], image: 'https://picsum.photos/id/3/200/150', createdAt: '2024-01-12', createdRelative: 'il y a 3 semaines' },
        { id: 10, title: 'Les meilleures pratiques pour le référencement SEO', category: 'Marketing', tags: ['SEO', 'Google', 'Analytics', 'Content'], image: 'https://picsum.photos/id/4/200/150', createdAt: '2024-01-10', createdRelative: 'il y a 4 semaines' }
      ]
    }
  },
  computed: {
    uniqueCategories() {
      return [...new Set(this.articles.map(a => a.category))]
    },
    uniqueTagsCount() {
      const allTags = this.articles.flatMap(a => a.tags)
      return new Set(allTags).size
    },
    filteredArticles() {
      let filtered = this.articles
      if (this.searchTerm) filtered = filtered.filter(a => a.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      if (this.filterCategory) filtered = filtered.filter(a => a.category === this.filterCategory)
      return filtered
    },
    paginatedArticles() {
      const start = (this.currentPage - 1) * this.perPage
      return this.filteredArticles.slice(start, start + this.perPage)
    },
    totalPages() { return Math.ceil(this.filteredArticles.length / this.perPage) },
    startEntry() { return this.filteredArticles.length === 0 ? 0 : (this.currentPage - 1) * this.perPage + 1 },
    endEntry() { return Math.min(this.currentPage * this.perPage, this.filteredArticles.length) }
  },
  watch: { searchTerm() { this.currentPage = 1 }, filterCategory() { this.currentPage = 1 } },
  methods: {
    openArticleModal(article = null) {
      this.editingArticle = article
      if (article) {
        this.articleForm = { ...article, tagsInput: article.tags.join(', '), imagePreview: article.image }
      } else {
        this.articleForm = { title: '', category: 'Photographie', tagsInput: '', content: '', image: null, imagePreview: null }
      }
      this.showArticleModal = true
    },
    closeArticleModal() { this.showArticleModal = false },
    onArticleImageChange(event) {
      const file = event.target.files[0]
      if (file) {
        this.articleForm.image = file
        const reader = new FileReader()
        reader.onload = (e) => { this.articleForm.imagePreview = e.target.result }
        reader.readAsDataURL(file)
      }
    },
    saveArticle() {
      const tags = this.articleForm.tagsInput.split(',').map(t => t.trim()).filter(t => t)
      if (this.editingArticle) {
        const index = this.articles.findIndex(a => a.id === this.editingArticle.id)
        if (index !== -1) this.articles[index] = { ...this.articles[index], ...this.articleForm, tags }
        alert('Article modifié avec succès')
      } else {
        const newArticle = {
          id: Date.now(), ...this.articleForm, tags,
          createdAt: new Date().toISOString().split('T')[0],
          createdRelative: 'à l\'instant'
        }
        this.articles.push(newArticle)
        alert('Article ajouté avec succès')
      }
      this.closeArticleModal()
    },
    editArticle(article) { this.openArticleModal(article) },
    deleteArticle(id) {
      if (confirm('Supprimer cet article ?')) this.articles = this.articles.filter(a => a.id !== id)
    },
    prevPage() { if (this.currentPage > 1) this.currentPage-- },
    nextPage() { if (this.currentPage < this.totalPages) this.currentPage++ }
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

.blog-module { animation: fadeIn 0.3s ease; }

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
  background-color: #f8fafc;
}

/* Style pour les tags */
.tag {
  transition: all 0.2s ease;
}

.tag:hover {
  background-color: #e2e8f0;
  transform: translateY(-1px);
}
</style>