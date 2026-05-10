<template>
    <div class="blog-category-module min-h-screen bg-slate-50 p-6">
        <div class="module-header flex justify-between items-center mb-8">
            <div>
                <h2 class="text-2xl font-bold text-slate-800 flex items-center gap-3">
                    <i class="fas fa-tags text-indigo-500 text-2xl"></i>
                    Catégories du blog
                </h2>
                <p class="text-slate-500 text-sm mt-1">Gérez les catégories et l'organisation de votre blog</p>
            </div>
            <button class="btn-add bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2" @click="openAddModal">
                <i class="fas fa-plus text-sm"></i> Ajouter une catégorie
            </button>
        </div>

        <!-- Statistiques -->
        <div class="stats-row grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            <div class="stat-box bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Catégories</p>
                    <p class="text-2xl font-bold text-indigo-600">{{ categories.length }}</p>
                </div>
                <div class="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-folder-open text-indigo-500"></i>
                </div>
            </div>
            <div class="stat-box bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Articles</p>
                    <p class="text-2xl font-bold text-emerald-600">{{ totalArticles }}</p>
                </div>
                <div class="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-newspaper text-emerald-500"></i>
                </div>
            </div>
            <div class="stat-box bg-white rounded-xl p-4 shadow-sm border border-slate-100 flex justify-between items-center">
                <div>
                    <p class="text-slate-500 text-sm">Tags populaires</p>
                    <p class="text-2xl font-bold text-amber-600">{{ popularTags.length }}</p>
                </div>
                <div class="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                    <i class="fas fa-fire text-amber-500"></i>
                </div>
            </div>
        </div>

        <!-- Tags populaires -->
        <div class="popular-tags-section bg-white rounded-xl p-5 shadow-sm border border-slate-100 mb-6">
            <h3 class="text-lg font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <i class="fas fa-fire text-orange-500"></i> Tags populaires
            </h3>
            <div class="tags-cloud flex flex-wrap gap-3">
                <span v-for="tag in popularTags" :key="tag" class="tag-cloud bg-slate-100 hover:bg-indigo-500 hover:text-white px-4 py-2 rounded-full text-sm cursor-pointer transition-all duration-200" :style="{ fontSize: getTagSize(tag) + 'px' }">
                    <i class="fas fa-tag text-[10px] mr-1"></i> {{ tag }}
                </span>
            </div>
        </div>

        <!-- Liste des catégories -->
        <div class="categories-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="category in categories" :key="category.id" class="category-card bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 border-l-4" :style="{ borderLeftColor: category.color }">
                <div class="category-header p-5">
                    <div class="flex items-start gap-4">
                        <div class="category-icon w-14 h-14 rounded-xl flex items-center justify-center text-2xl" :style="{ background: category.color + '20', color: category.color }">
                            <i :class="category.icon || 'fas fa-folder'"></i>
                        </div>
                        <div class="category-info flex-1">
                            <h3 class="text-lg font-bold text-slate-800">{{ category.name }}</h3>
                            <p class="text-sm text-slate-500 mt-1">{{ category.description || 'Aucune description' }}</p>
                        </div>
                        <div class="category-actions flex gap-2">
                            <button class="btn-edit w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="editCategory(category)" title="Modifier">
                                <i class="fas fa-edit text-sm"></i>
                            </button>
                            <button class="btn-delete w-8 h-8 rounded-lg bg-red-50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-200 flex items-center justify-center" @click="deleteCategory(category.id)" title="Supprimer">
                                <i class="fas fa-trash-alt text-sm"></i>
                            </button>
                        </div>
                    </div>
                </div>
                <div class="category-footer bg-slate-50 px-5 py-3 flex justify-between items-center text-sm border-t border-slate-100">
                    <span class="article-count flex items-center gap-1.5 text-indigo-600">
                        <i class="fas fa-file-alt text-xs"></i> {{ category.articleCount }} articles
                    </span>
                    <span class="category-slug text-slate-400 font-mono text-xs flex items-center gap-1">
                        <i class="fas fa-link text-[10px]"></i> {{ category.slug }}
                    </span>
                </div>
            </div>
        </div>

        <!-- Modal Ajout/Modification -->
        <div class="modal fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-all duration-300" :class="{ 'hidden': !showModal, 'flex': showModal }" @click.self="closeModal">
            <div class="modal-content bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden shadow-2xl animate-fade-in-up">
                <div class="modal-header flex justify-between items-center p-5 border-b border-slate-200 bg-gradient-to-r from-indigo-50 to-white">
                    <h3 class="text-xl font-bold text-slate-800 flex items-center gap-2">
                        <i class="fas fa-tag text-indigo-500"></i>
                        {{ editingCategory ? 'Modifier la catégorie' : 'Ajouter une catégorie' }}
                    </h3>
                    <button class="close-modal w-8 h-8 rounded-full hover:bg-slate-100 transition-colors flex items-center justify-center text-slate-400 hover:text-slate-600 text-2xl" @click="closeModal">&times;</button>
                </div>
                <div class="modal-body p-6 overflow-y-auto max-h-[60vh]">
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            <i class="fas fa-heading text-indigo-500 mr-1"></i>Nom de la catégorie <span class="text-red-500">*</span>
                        </label>
                        <input type="text" v-model="form.name" placeholder="Ex: Technologie, Business, Design..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            <i class="fas fa-link text-indigo-500 mr-1"></i>Slug (URL)
                        </label>
                        <input type="text" v-model="form.slug" :placeholder="generateSlug(form.name)" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                        <small class="text-xs text-slate-400 mt-1 block">Laissez vide pour générer automatiquement</small>
                    </div>
                    <div class="form-group mb-4">
                        <label class="block text-sm font-semibold text-slate-700 mb-2">
                            <i class="fas fa-align-left text-indigo-500 mr-1"></i>Description
                        </label>
                        <textarea v-model="form.description" rows="3" placeholder="Description de la catégorie..." class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"></textarea>
                    </div>
                    <div class="form-row grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div class="form-group mb-4">
                            <label class="block text-sm font-semibold text-slate-700 mb-2">
                                <i class="fas fa-palette text-indigo-500 mr-1"></i>Couleur
                            </label>
                            <div class="color-input flex items-center gap-3">
                                <input type="color" v-model="form.color" class="w-12 h-10 border border-slate-300 rounded-lg cursor-pointer">
                                <span class="color-value text-sm font-mono text-slate-600">{{ form.color }}</span>
                            </div>
                        </div>
                        <div class="form-group mb-4">
                            <label class="block text-sm font-semibold text-slate-700 mb-2">
                                <i class="fas fa-icons text-indigo-500 mr-1"></i>Icône
                            </label>
                            <select v-model="form.icon" class="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent">
                                <option value="fas fa-folder">📁 Dossier</option>
                                <option value="fas fa-code">💻 Code</option>
                                <option value="fas fa-palette">🎨 Design</option>
                                <option value="fas fa-chart-line">📊 Business</option>
                                <option value="fas fa-camera">📷 Photo</option>
                                <option value="fas fa-music">🎵 Musique</option>
                                <option value="fas fa-heart">❤️ Santé</option>
                                <option value="fas fa-graduation-cap">🎓 Éducation</option>
                                <option value="fas fa-gamepad">🎮 Gaming</option>
                                <option value="fas fa-robot">🤖 IA</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="modal-footer flex justify-end gap-3 p-5 border-t border-slate-200 bg-slate-50">
                    <button class="btn-cancel px-5 py-2 bg-slate-200 text-slate-700 rounded-xl text-sm font-medium hover:bg-slate-300 transition-colors flex items-center gap-2" @click="closeModal">
                        <i class="fas fa-times"></i> Annuler
                    </button>
                    <button class="btn-save px-5 py-2 bg-indigo-500 text-white rounded-xl text-sm font-medium hover:bg-indigo-600 transition-colors shadow-sm flex items-center gap-2" @click="saveCategory">
                        <i class="fas fa-save"></i> Enregistrer
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'ModuleBlogCategory',
    data() {
        return {
            showModal: false,
            editingCategory: null,
            form: {
                name: '',
                slug: '',
                description: '',
                color: '#6366f1',
                icon: 'fas fa-folder'
            },
            // 10 exemples de catégories avec images et icônes
            categories: [
                { id: 1, name: 'Business', slug: 'business', description: 'Articles sur le monde des affaires, entrepreneuriat et gestion', color: '#3b82f6', icon: 'fas fa-chart-line', articleCount: 12, image: 'https://picsum.photos/id/20/100/100' },
                { id: 2, name: 'Technologie', slug: 'technologie', description: 'Nouvelles technologies, innovations et tendances tech', color: '#10b981', icon: 'fas fa-code', articleCount: 8, image: 'https://picsum.photos/id/0/100/100' },
                { id: 3, name: 'Design', slug: 'design', description: 'UI/UX, design graphique, web design et créativité', color: '#f59e0b', icon: 'fas fa-palette', articleCount: 5, image: 'https://picsum.photos/id/10/100/100' },
                { id: 4, name: 'Marketing', slug: 'marketing', description: 'Stratégies marketing digital, SEO et réseaux sociaux', color: '#ef4444', icon: 'fas fa-chart-line', articleCount: 7, image: 'https://picsum.photos/id/26/100/100' },
                { id: 5, name: 'Photographie', slug: 'photographie', description: 'Techniques photo, retouche et matériel', color: '#a855f7', icon: 'fas fa-camera', articleCount: 4, image: 'https://picsum.photos/id/15/100/100' },
                { id: 6, name: 'Développement', slug: 'developpement', description: 'Programmation, frameworks et bonnes pratiques', color: '#06b6d4', icon: 'fas fa-code', articleCount: 15, image: 'https://picsum.photos/id/1/100/100' },
                { id: 7, name: 'Audio', slug: 'audio', description: 'Musique, production audio et sound design', color: '#ec4899', icon: 'fas fa-music', articleCount: 3, image: 'https://picsum.photos/id/29/100/100' },
                { id: 8, name: 'Événements', slug: 'evenements', description: 'Conférences, meetups et salons professionnels', color: '#8b5cf6', icon: 'fas fa-calendar', articleCount: 6, image: 'https://picsum.photos/id/2/100/100' },
                { id: 9, name: 'Intelligence Artificielle', slug: 'ia', description: 'Machine learning, deep learning et data science', color: '#f97316', icon: 'fas fa-robot', articleCount: 10, image: 'https://picsum.photos/id/3/100/100' },
                { id: 10, name: 'Gaming', slug: 'gaming', description: 'Jeux vidéo, esport et game design', color: '#14b8a6', icon: 'fas fa-gamepad', articleCount: 9, image: 'https://picsum.photos/id/4/100/100' }
            ],
            popularTags: ['Business', 'Event', 'Audio', 'Technology', 'Video', 'Software', 'Conference', 'Marketing', 'Design', 'Development', 'SEO', 'React', 'Vue.js', 'Laravel', 'Python', 'Data Science', 'AI', 'Gaming', 'UI/UX', 'Mobile']
        }
    },
    computed: {
        totalArticles() {
            return this.categories.reduce((sum, cat) => sum + cat.articleCount, 0)
        }
    },
    watch: {
        'form.name'(newVal) {
            if (!this.editingCategory || !this.form.slug) {
                this.form.slug = this.generateSlug(newVal)
            }
        }
    },
    methods: {
        generateSlug(text) {
            if (!text) return ''
            return text.toLowerCase()
                .replace(/[éèêë]/g, 'e')
                .replace(/[àâä]/g, 'a')
                .replace(/[ôö]/g, 'o')
                .replace(/[ç]/g, 'c')
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/^-|-$/g, '')
        },
        getTagSize(tag) {
            const baseSize = 12
            const maxSize = 24
            const popularity = (tag.length * 7) % 100
            return baseSize + (popularity / 100) * (maxSize - baseSize)
        },
        openAddModal() {
            this.editingCategory = null
            this.form = {
                name: '',
                slug: '',
                description: '',
                color: '#6366f1',
                icon: 'fas fa-folder'
            }
            this.showModal = true
        },
        editCategory(category) {
            this.editingCategory = category
            this.form = {
                name: category.name,
                slug: category.slug,
                description: category.description,
                color: category.color,
                icon: category.icon
            }
            this.showModal = true
        },
        saveCategory() {
            if (!this.form.name.trim()) {
                alert('Veuillez saisir un nom de catégorie')
                return
            }

            const slug = this.form.slug || this.generateSlug(this.form.name)

            if (this.editingCategory) {
                const index = this.categories.findIndex(c => c.id === this.editingCategory.id)
                if (index !== -1) {
                    this.categories[index] = {
                        ...this.categories[index],
                        name: this.form.name,
                        slug: slug,
                        description: this.form.description,
                        color: this.form.color,
                        icon: this.form.icon
                    }
                }
                alert('Catégorie modifiée avec succès')
            } else {
                const newCategory = {
                    id: Date.now(),
                    name: this.form.name,
                    slug: slug,
                    description: this.form.description,
                    color: this.form.color,
                    icon: this.form.icon,
                    articleCount: 0,
                    image: `https://picsum.photos/id/${Math.floor(Math.random() * 100)}/100/100`
                }
                this.categories.push(newCategory)
                alert('Catégorie ajoutée avec succès')
            }
            this.closeModal()
        },
        deleteCategory(id) {
            if (confirm('Êtes-vous sûr de vouloir supprimer cette catégorie ? Tous les articles associés seront déplacés.')) {
                this.categories = this.categories.filter(c => c.id !== id)
                alert('Catégorie supprimée avec succès')
            }
        },
        closeModal() {
            this.showModal = false
            this.editingCategory = null
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

@keyframes slideIn {
    from {
        transform: translateY(-30px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

.blog-category-module {
    animation: fadeIn 0.3s ease;
}

.stats-row .stat-box,
.popular-tags-section,
.categories-grid .category-card {
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

/* Animation pour les tags */
.tag-cloud {
    transition: all 0.2s ease;
    cursor: pointer;
}

.tag-cloud:hover {
    transform: translateY(-2px);
}

/* Animation pour les cartes */
.category-card {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.category-card:hover {
    transform: translateY(-4px);
}

/* Modal animation */
.animate-fade-in-up {
    animation: fadeInUp 0.3s ease-out;
}

/* Focus styles */
input:focus, textarea:focus, select:focus {
    outline: none;
    ring: 2px solid #6366f1;
}

/* Color input custom */
input[type="color"] {
    cursor: pointer;
}

input[type="color"]::-webkit-color-swatch-wrapper {
    padding: 0;
}

input[type="color"]::-webkit-color-swatch {
    border: none;
    border-radius: 8px;
}
</style>