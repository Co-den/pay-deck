"use client"
import { Suspense, useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Search, Clock, User, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"

const blogPosts = [
  {
    id: 1,
    title: "The Future of Payment Processing: Trends in 2025",
    excerpt:
      "Explore the latest trends shaping the payment industry, from real-time settlements to advanced fraud prevention.",
    author: "Sarah Johnson",
    date: "2024-12-28",
    readTime: "8 min read",
    category: "Industry",
    featured: true,
  },
  {
    id: 2,
    title: "How to Reduce Payment Abandonment Rates",
    excerpt:
      "Learn proven strategies to decrease checkout abandonment and increase conversion rates for your business.",
    author: "Michael Chen",
    date: "2024-12-25",
    readTime: "6 min read",
    category: "Best Practices",
    featured: true,
  },
  {
    id: 3,
    title: "PayDeck Security: Protecting Your Customer Data",
    excerpt: "An in-depth look at how PayDeck implements bank-level security to protect sensitive payment information.",
    author: "Emma Williams",
    date: "2024-12-22",
    readTime: "7 min read",
    category: "Security",
    featured: true,
  },
  {
    id: 4,
    title: "Global Payment Methods: A Complete Guide",
    excerpt: "Understand the different payment methods available globally and how to optimize for each region.",
    author: "David Rodriguez",
    date: "2024-12-19",
    readTime: "10 min read",
    category: "Guides",
    featured: false,
  },
  {
    id: 5,
    title: "Integrating PayDeck: Step-by-Step Tutorial",
    excerpt: "A comprehensive guide to integrating PayDeck into your e-commerce platform in under 30 minutes.",
    author: "Lisa Anderson",
    date: "2024-12-16",
    readTime: "9 min read",
    category: "Tutorials",
    featured: false,
  },
  {
    id: 6,
    title: "Case Study: How TechStore Increased Revenue by 40%",
    excerpt: "Learn how TechStore optimized their payment experience and increased transaction value.",
    author: "James Wilson",
    date: "2024-12-13",
    readTime: "11 min read",
    category: "Case Studies",
    featured: false,
  },
]

const categories = ["All", "Industry", "Best Practices", "Security", "Guides", "Tutorials", "Case Studies"]

function BlogContent() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")

  const filteredPosts = blogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredPosts = filteredPosts.filter((post) => post.featured).slice(0, 3)
  const otherPosts = filteredPosts.filter((post) => !post.featured)

  return (
    <div className="min-h-screen bg-background">
      <div className="container py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">PayDeck Blog</h1>
          <p className="text-lg text-muted-foreground">
            Industry insights, best practices, and updates from the PayDeck team
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
            <Input
              type="text"
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Posts */}
        {featuredPosts.length > 0 && (
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-6">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {featuredPosts.map((post) => (
                <article key={post.id} className="group cursor-pointer">
                  <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg p-6 h-full hover:shadow-lg transition-shadow">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-semibold">
                        {post.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{post.title}</h3>
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Other Posts */}
        {otherPosts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">{featuredPosts.length > 0 ? "More Articles" : "Articles"}</h2>
            <div className="space-y-4">
              {otherPosts.map((post) => (
                <article
                  key={post.id}
                  className="group cursor-pointer border border-border rounded-lg p-6 hover:border-primary transition-colors"
                >
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-3">
                        <span className="inline-block px-3 py-1 bg-muted text-muted-foreground rounded-full text-xs font-semibold">
                          {post.category}
                        </span>
                      </div>
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-3">{post.excerpt}</p>
                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {post.author}
                        </span>
                        <span>{post.date}</span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime}
                        </span>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all mt-1 flex-shrink-0" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">No articles found. Try adjusting your search or filters.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function BlogPage() {
  return (
    <>
      <Header />
      <Suspense fallback={null}>
        <BlogContent />
      </Suspense>
      <Footer />
    </>
  )
}
