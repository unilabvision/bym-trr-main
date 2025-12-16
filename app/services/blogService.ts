// app/services/blogService.ts
import { supabase } from '@/lib/supabase';
import { BlogPost, BlogContent, BlogAuthor } from '@/app/types/blog';

// Supabase storage URL düzeltme fonksiyonu
const getFullStorageUrl = (path: string | null): string => {
  if (!path) return '/blog/default-image.webp'; // Default görsel
  
  // Eğer URL zaten tam ise (http:// veya https:// ile başlıyorsa) değiştirme
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // Eğer path /blog/ ile başlıyorsa, muhtemelen bu bir statik dosya yoludur
  if (path.startsWith('/blog/')) {
    return path;
  }
  
  // Path'in başında / karakteri yoksa ekle
  const normalizedPath = path.startsWith('/') ? path : '/' + path;
  
  // Supabase storage URL'si
  const baseUrl = "https://ghuellgktqqzpryuyiky.supabase.co/storage/v1/object/public/blog-images";
  
  return baseUrl + normalizedPath;
};

/**
 * Fetch all blog categories for a specific locale
 */
export async function getBlogCategories(locale: string): Promise<string[]> {
  try {
    const { data, error } = await supabase
      .from('blog_categories')
      .select('name')
      .eq('locale', locale)
      .order('name');
    
    if (error) throw error;
    
    return data.map(category => category.name);
  } catch (error) {
    console.error('Error fetching blog categories:', error);
    // Return default categories if fetch fails
    return locale === 'tr' 
      ? ["Biyoteknoloji", "Doku Mühendisliği", "Genetik Mühendisliği", "Biyoinformatik", "Biyomedikal", "Biyomalzemeler"]
      : ["Biotechnology", "Tissue Engineering", "Genetic Engineering", "Bioinformatics", "Biomedical", "Biomaterials"];
  }
}

/**
 * Fetch all blog posts with authors and tags for a specific locale
 */
export async function getBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    // Get all blog posts for the locale
    const { data: posts, error: postsError } = await supabase
      .from('blog_posts')
      .select(`
        id,
        post_id,
        title,
        slug,
        category,
        excerpt,
        content,
        date,
        reading_time,
        image,
        featured,
        author_id
      `)
      .eq('locale', locale)
      .order('date', { ascending: false });
    
    if (postsError) throw postsError;
    
    if (!posts || !posts.length) {
      console.log(`No blog posts found for locale: ${locale}. Using default posts.`);
      return getSampleBlogPosts(locale);
    }
    
    // Get all authors for this locale
    const { data: authors, error: authorsError } = await supabase
      .from('blog_authors')
      .select('*')
      .eq('locale', locale);
    
    if (authorsError) {
      console.warn('Error fetching blog authors:', authorsError);
      // Continue with default author
    }
    
    // Varsayılan bir yazar bilgisi tanımlayalım
    const defaultAuthor: BlogAuthor = {
      name: locale === 'tr' ? 'BYM Türkiye Ekibi' : 'BYM Turkey Team',
      avatar: '/blog/authors/default.webp',
      position: locale === 'tr' ? 'Yazar' : 'Author',
      bio: ''
    };
    
    // Get all tags for all posts in this locale
    const postIds = posts.map(post => post.post_id);
    const { data: tags, error: tagsError } = await supabase
      .from('blog_post_tags')
      .select('post_id, tag')
      .eq('locale', locale)
      .in('post_id', postIds);
    
    if (tagsError) {
      console.warn('Error fetching blog tags:', tagsError);
      // Continue without tags
    }
    
    // Create a map of post_id to tags for quick lookup
    const tagMap = new Map();
    if (tags) {
      tags.forEach(tag => {
        if (!tagMap.has(tag.post_id)) {
          tagMap.set(tag.post_id, []);
        }
        tagMap.get(tag.post_id).push(tag.tag);
      });
    }
    
    // Yazarlar arasından yazı ile eşleşeni bul ya da rastgele bir yazar seç
    const getAuthorForPost = (post_id: string, author_id?: string): BlogAuthor => {
      if (author_id && authors && authors.length > 0) {
        const foundAuthor = authors.find(a => a.author_id === author_id);
        if (foundAuthor) {
          return {
            name: foundAuthor.name,
            avatar: foundAuthor.avatar_path ? getFullStorageUrl(foundAuthor.avatar_path) : '/blog/authors/default.webp',
            position: foundAuthor.position || (locale === 'tr' ? 'Yazar' : 'Author'),
            bio: foundAuthor.bio || ''
          };
        }
      }
      
      // Yazar belirtilmemişse veya bulunamazsa, rastgele bir yazar seç
      if (authors && authors.length > 0) {
        const randomIndex = Math.floor(Math.random() * authors.length);
        const author = authors[randomIndex];
        return {
          name: author.name,
          avatar: author.avatar_path ? getFullStorageUrl(author.avatar_path) : '/blog/authors/default.webp',
          position: author.position || (locale === 'tr' ? 'Yazar' : 'Author'),
          bio: author.bio || ''
        };
      }
      
      return defaultAuthor;
    };
    
    // Build the complete blog posts
    return posts.map(post => {
      return {
        id: post.post_id,
        title: post.title,
        slug: post.slug,
        category: post.category,
        excerpt: post.excerpt,
        content: post.content,
        author: getAuthorForPost(post.post_id, post.author_id),
        date: post.date,
        readingTime: post.reading_time || '5 dk',
        image: getFullStorageUrl(post.image), // Tam URL'ye dönüştür
        tags: tagMap.get(post.post_id) || [],
        featured: post.featured
      };
    });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return getSampleBlogPosts(locale);
  }
}

/**
 * Fetch featured blog posts for a specific locale
 */
export async function getFeaturedBlogPosts(locale: string): Promise<BlogPost[]> {
  try {
    const allPosts = await getBlogPosts(locale);
    const featured = allPosts.filter(post => post.featured);
    
    // If no featured posts, use the first 2 posts
    if (featured.length === 0 && allPosts.length > 0) {
      return allPosts.slice(0, 2);
    }
    
    return featured;
  } catch (error) {
    console.error('Error fetching featured blog posts:', error);
    return [];
  }
}

/**
 * Fetch a single blog post by slug for a specific locale
 */
export async function getBlogPostBySlug(slug: string, locale: string): Promise<BlogPost | null> {
  try {
    if (!slug) {
      console.error('No slug provided to getBlogPostBySlug');
      return null;
    }

    // Fetch the post by slug
    const { data: post, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        post_id,
        title,
        slug,
        category,
        excerpt,
        content,
        date,
        reading_time,
        image,
        featured,
        author_id
      `)
      .eq('locale', locale)
      .eq('slug', slug)
      .single();

    if (error || !post) {
      console.warn(`Blog post with slug "${slug}" not found in database:`, error);
      return null;
    }

    // Fetch the author - Önce belirli bir author_id ile deneyelim
    let author: BlogAuthor = {
      name: locale === 'tr' ? 'BYM Türkiye Ekibi' : 'BYM Turkey Team',
      avatar: '/blog/authors/default.webp',
      position: locale === 'tr' ? 'Yazar' : 'Author',
      bio: locale === 'tr' ? 'BYM Türkiye ekibinde uzman bir yazar.' : 'An expert writer in the BYM Turkey team.'
    };

    if (post.author_id) {
      const { data: authorData, error: authorError } = await supabase
        .from('blog_authors')
        .select('*')
        .eq('locale', locale)
        .eq('author_id', post.author_id)
        .single();
        
      if (!authorError && authorData) {
        author = {
          name: authorData.name,
          avatar: authorData.avatar_path ? getFullStorageUrl(authorData.avatar_path) : '/blog/authors/default.webp',
          position: authorData.position || (locale === 'tr' ? 'Yazar' : 'Author'),
          bio: authorData.bio || ''
        };
      }
    }

    // Fetch tags for the post
    const { data: tags, error: tagsError } = await supabase
      .from('blog_post_tags')
      .select('tag')
      .eq('locale', locale)
      .eq('post_id', post.post_id);

    if (tagsError) {
      console.warn('Error fetching blog tags:', tagsError);
    }

    // Build the complete blog post
    return {
      id: post.post_id,
      title: post.title,
      slug: post.slug,
      category: post.category,
      excerpt: post.excerpt,
      content: post.content,
      author: author,
      date: post.date,
      readingTime: post.reading_time || '5 dk',
      image: getFullStorageUrl(post.image), // Tam URL'ye dönüştür
      tags: tags ? tags.map(tag => tag.tag) : [],
      featured: post.featured,
    };
  } catch (error) {
    console.error(`Error fetching blog post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Fetch related blog posts for a specific post
 */
export async function getRelatedBlogPosts(post: BlogPost, locale: string, limit: number = 3): Promise<BlogPost[]> {
  try {
    if (!post) {
      console.warn('No post provided to getRelatedBlogPosts');
      return [];
    }
    
    // Kategori ile ilgili yazıları al
    const { data: relatedPosts, error } = await supabase
      .from('blog_posts')
      .select(`
        id,
        post_id,
        title,
        slug,
        category,
        date,
        excerpt,
        content,
        reading_time,
        image,
        featured,
        author_id
      `)
      .eq('locale', locale)
      .eq('category', post.category)
      .neq('post_id', post.id)
      .limit(limit);
      
    if (error || !relatedPosts || relatedPosts.length === 0) {
      console.log('No related posts found by category, trying to get random posts');
      
      // Kategori ile ilişkili yazı yoksa, rastgele yazılar al
      const { data: randomPosts, error: randomError } = await supabase
        .from('blog_posts')
        .select(`
          id,
          post_id,
          title,
          slug,
          category,
          excerpt,
          content,
          date,
          reading_time,
          image,
          featured,
          author_id
        `)
        .eq('locale', locale)
        .neq('post_id', post.id)
        .limit(limit);
        
      if (randomError || !randomPosts || randomPosts.length === 0) {
        return [];
      }
      
      // Her yazı için temel yazarı al ve tüm alanları doldur
      return Promise.all(randomPosts.map(async (relatedPost) => {
        // Yazı etiketlerini al
        const { data: tagsData } = await supabase
          .from('blog_post_tags')
          .select('tag')
          .eq('locale', locale)
          .eq('post_id', relatedPost.post_id);
          
        const tags = tagsData ? tagsData.map(t => t.tag) : [];
        
        // Varsayılan yazar
        let author: BlogAuthor = {
          name: locale === 'tr' ? 'BYM Türkiye Ekibi' : 'BYM Turkey Team',
          avatar: '/blog/authors/default.webp',
          position: locale === 'tr' ? 'Yazar' : 'Author',
          bio: ''
        };
        
        // Yazar bilgilerini al
        if (relatedPost.author_id) {
          const { data: authorData } = await supabase
            .from('blog_authors')
            .select('name, avatar_path, position, bio')
            .eq('locale', locale)
            .eq('author_id', relatedPost.author_id)
            .single();
            
          if (authorData) {
            author = {
              name: authorData.name,
              avatar: authorData.avatar_path ? getFullStorageUrl(authorData.avatar_path) : '/blog/authors/default.webp',
              position: authorData.position || (locale === 'tr' ? 'Yazar' : 'Author'),
              bio: authorData.bio || ''
            };
          }
        }
        
        // BlogPost tipine uygun tüm alanları doldur
        return {
          id: relatedPost.post_id,
          title: relatedPost.title,
          slug: relatedPost.slug,
          category: relatedPost.category,
          excerpt: relatedPost.excerpt || '',
          content: relatedPost.content || '',
          author: author,
          date: relatedPost.date,
          readingTime: relatedPost.reading_time || '5 dk',
          image: getFullStorageUrl(relatedPost.image),
          tags: tags,
          featured: relatedPost.featured || false
        };
      }));
    }
    
    // Her yazı için temel yazarı al ve tüm alanları doldur
    return Promise.all(relatedPosts.map(async (relatedPost) => {
      // Yazı etiketlerini al
      const { data: tagsData } = await supabase
        .from('blog_post_tags')
        .select('tag')
        .eq('locale', locale)
        .eq('post_id', relatedPost.post_id);
        
      const tags = tagsData ? tagsData.map(t => t.tag) : [];
      
      // Varsayılan yazar
      let author: BlogAuthor = {
        name: locale === 'tr' ? 'BYM Türkiye Ekibi' : 'BYM Turkey Team',
        avatar: '/blog/authors/default.webp',
        position: locale === 'tr' ? 'Yazar' : 'Author',
        bio: ''
      };
      
      // Yazar bilgilerini al
      if (relatedPost.author_id) {
        const { data: authorData } = await supabase
          .from('blog_authors')
          .select('name, avatar_path, position, bio')
          .eq('locale', locale)
          .eq('author_id', relatedPost.author_id)
          .single();
          
        if (authorData) {
          author = {
            name: authorData.name,
            avatar: authorData.avatar_path ? getFullStorageUrl(authorData.avatar_path) : '/blog/authors/default.webp',
            position: authorData.position || (locale === 'tr' ? 'Yazar' : 'Author'),
            bio: authorData.bio || ''
          };
        }
      }
      
      // BlogPost tipine uygun tüm alanları doldur
      return {
        id: relatedPost.post_id,
        title: relatedPost.title,
        slug: relatedPost.slug,
        category: relatedPost.category,
        excerpt: relatedPost.excerpt || '',
        content: relatedPost.content || '',
        author: author,
        date: relatedPost.date,
        readingTime: relatedPost.reading_time || '5 dk',
        image: getFullStorageUrl(relatedPost.image),
        tags: tags,
        featured: relatedPost.featured || false
      };
    }));
  } catch (error) {
    console.error('Error fetching related blog posts:', error);
    return [];
  }
}

/**
 * Get complete blog content for a specific locale
 */
export async function getBlogContent(locale: string): Promise<BlogContent> {
  try {
    const [categories, allPosts, featuredPosts] = await Promise.all([
      getBlogCategories(locale),
      getBlogPosts(locale),
      getFeaturedBlogPosts(locale)
    ]);
    
    return {
      title: locale === 'tr' ? 'Blog' : 'Blog',
      description: locale === 'tr' 
        ? 'Biyomühendislik, biyoteknoloji ve yaşam bilimleri alanlarında güncel araştırmalar, makaleler ve içgörüler.'
        : 'Current research, articles, and insights in bioengineering, biotechnology, and life sciences.',
      categories,
      posts: allPosts,
      featured: featuredPosts
    };
  } catch (error) {
    console.error('Error fetching blog content:', error);
    
    // Return sample content if everything fails
    const samplePosts = getSampleBlogPosts(locale);
    
    return {
      title: 'Blog',
      description: locale === 'tr' 
        ? 'Biyomühendislik, biyoteknoloji ve yaşam bilimleri alanlarında güncel araştırmalar, makaleler ve içgörüler.'
        : 'Current research, articles, and insights in bioengineering, biotechnology, and life sciences.',
      categories: locale === 'tr' 
        ? ["Biyoteknoloji", "Doku Mühendisliği", "Genetik Mühendisliği", "Biyoinformatik", "Biyomedikal", "Biyomalzemeler"]
        : ["Biotechnology", "Tissue Engineering", "Genetic Engineering", "Bioinformatics", "Biomedical", "Biomaterials"],
      posts: samplePosts,
      featured: samplePosts.slice(0, 2)
    };
  }
}


/**
 * Generate sample blog posts for development and fallback
 */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function getSampleBlogPosts(locale: string): BlogPost[] {
  return []; // Boş dizi döndür
}