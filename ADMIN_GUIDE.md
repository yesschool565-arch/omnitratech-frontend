# Admin & CMS Management Guide - Omnitratech

Complete guide for managing content through WordPress admin dashboard.

## 🎯 Admin Dashboard Access

**Local Development:**
- URL: `http://localhost:8000/wp-admin`
- Username: `admin` (default)
- Password: Set during WordPress installation

**Production:**
- URL: `https://admin.your-domain.com/wp-admin`
- Credentials: Set up during WordPress installation

---

## 📝 Managing Content

### 1. Services Management

Navigate to: **WordPress Admin → Services (Custom Post Type)**

#### Adding a New Service:

1. Click "Add New Service"
2. Fill in the following fields:

**Basic Information:**
- **Title**: Service name (e.g., "Web Development")
- **Content (Editor)**: Full detailed description
- **Excerpt**: Short description (100-150 characters)

**ACF Custom Fields (Advanced Custom Fields):**
- **Icon Name**: Name of the icon (from Lucide Icons)
  - Examples: `Code`, `Zap`, `Globe`, `Shield`, `Rocket`, `Database`
  - See: https://lucide.dev/ for full list
- **Full Description**: Extended description (auto-filled from Content)
- **Benefits** (Repeater Field):
  - Add multiple benefits, one per row
  - Example: "Responsive Design", "SEO Optimized", "Fast Performance"
- **Features** (Repeater Field):
  - Icon Name: Icon for the feature
  - Title: Feature title
  - Description: Feature description

**Featured Image:**
- Add thumbnail/hero image for the service

**Publish:**
- Click "Publish" to make live
- Note the slug (appears in URL) - used by frontend

---

### 2. Resources Management

Navigate to: **WordPress Admin → Resources**

#### Adding a New Resource:

1. Click "Add New Resource"
2. Fill in the following:

**Basic Information:**
- **Title**: Resource name (e.g., "API Integration Guide")
- **Content**: Full resource content
- **Excerpt**: Short description

**ACF Custom Fields:**
- **Category**: Type of resource
  - Options: Guides, Tutorials, Whitepapers, Case Studies, Webinars
- **Format**: Resource format
  - Options: Article, Video, PDF, Interactive
- **Read Time**: Estimated reading time (e.g., "5 min", "15 min")

**Featured Image:**
- Thumbnail image for the resource

**Publish:**
- Click "Publish"

---

### 3. Jobs Management

Navigate to: **WordPress Admin → Jobs**

#### Adding a New Job Opening:

1. Click "Add New Job"
2. Fill in:

**Basic Information:**
- **Title**: Job title (e.g., "Senior React Developer")
- **Content**: Full job description, responsibilities, requirements
- **Excerpt**: Quick summary

**ACF Custom Fields:**
- **Department**: Department/Team (e.g., "Engineering", "Design", "Marketing")
- **Location**: Job location (e.g., "Remote", "New York, NY", "San Francisco, CA")
- **Job Type**: Employment type
  - Options: Full-time, Part-time, Contract, Freelance
- **Tags** (Repeater):
  - Add required skills/tags
  - Example: React, TypeScript, Node.js

**Publish:**
- Click "Publish"
- Share job link on careers page

---

### 4. Industries Management

Navigate to: **WordPress Admin → Industries**

#### Adding a New Industry:

1. Click "Add New Industry"
2. Fill in:

**Basic Information:**
- **Title**: Industry name (e.g., "Healthcare", "Finance", "Retail")
- **Content**: Detailed industry information
- **Excerpt**: Brief overview

**ACF Custom Fields:**
- **Icon Name**: Industry icon
  - Examples: `Briefcase`, `Building`, `Zap`, `Shield`, `TrendingUp`
- **Featured Image**: Industry representative image
- **Features** (Repeater):
  - Icon Name
  - Title: Feature title
  - Description: Feature details
- **Solutions** (Repeater):
  - Add relevant solutions/services offered for this industry

**Publish:**
- Click "Publish"

---

## 🎨 Using Images & Media

### Uploading Images:

1. Click "Featured Image" or use Media Library
2. Upload or select existing image
3. Set Alt text (important for SEO)
4. Click "Set featured image"

### Image Guidelines:

- **Featured Images**: 1200x800px minimum
- **Icon References**: Use Lucide React icon names (https://lucide.dev/)
- **Format**: JPG for photos, PNG for graphics
- **File size**: Optimize for web (<500KB)

---

## ⚙️ Website Settings

### General Settings:
**WordPress Admin → Settings → General**
- Site Title: "Omnitratech"
- Tagline: Your tagline
- WordPress Address (URL): Should match your domain
- Site Address (URL): Should match your domain

### Permalink Settings:
**WordPress Admin → Settings → Permalinks**
- Select "Post name" for clean URLs
- Save Changes (important for REST API)

### REST API:
- Usually enabled by default
- Verify: Visit `https://your-site.com/wp-json/wp/v2/service`
- Should return JSON data

---

## 👥 User Management

### Managing Admin Users:

**WordPress Admin → Users**

1. **Add New User**:
   - Username
   - Email
   - First & Last Name
   - Role: Choose appropriate role
   - Send them login instructions

2. **Roles Available**:
   - Administrator: Full access
   - Editor: Can publish posts
   - Author: Can write posts
   - Contributor: Can draft posts
   - Subscriber: Read-only

### User Permissions:

- **Content Managers**: Editor role
- **SEO Specialists**: Editor role (with SEO plugin)
- **Developers**: Administrator role
- **Client Review**: Subscriber role

---

## 🔒 Security Best Practices

1. **Strong Passwords**:
   - Use 16+ character passwords
   - Mix uppercase, lowercase, numbers, symbols
   - Never use default admin username

2. **Regular Backups**:
   - WordPress automatically backs up daily
   - Download backups weekly to local storage

3. **Keep WordPress Updated**:
   - Update WordPress core
   - Update all plugins
   - Update themes

4. **Security Plugins**:
   - Consider: Wordfence, Sucuri, iThemes Security
   - Monitor for threats

5. **Two-Factor Authentication**:
   - Install security plugin that supports 2FA
   - Enable for all admin users

---

## 📊 Publishing Workflow

### Content Checklist Before Publishing:

- [ ] Title is clear and SEO-optimized
- [ ] Content is well-structured with headings
- [ ] All required ACF fields are filled
- [ ] Featured image is uploaded with alt text
- [ ] Excerpt is written (100-150 chars)
- [ ] Slug is SEO-friendly (auto-generated)
- [ ] Preview looks good on mobile
- [ ] Links are working (if applicable)
- [ ] No spelling/grammar errors
- [ ] Ready for publication

### Publishing:

1. Review "Preview" on right side
2. Click "Publish" button
3. Verify on frontend after ~1 minute
4. Share on social media if applicable

### Scheduling:

1. Go to "Publish" section
2. Click "Edit" next to date
3. Set future publish date/time
4. Click "Schedule"
5. Post will auto-publish at set time

---

## 🔍 SEO Tips

### Title & Excerpt:
- Keep title under 60 characters
- Include target keywords
- Write meta description (excerpt) under 160 characters

### Content:
- Use headings (H2, H3) to structure content
- Include keywords naturally
- Add internal links to related content
- Keep paragraphs short (2-3 sentences)

### Images:
- Always add descriptive alt text
- Compress images for speed
- Use descriptive filenames

### URLs (Slugs):
- Use hyphens to separate words
- Make slugs descriptive
- Avoid special characters

---

## 🐛 Troubleshooting

### Content Not Appearing on Frontend

1. Check if post is "Published" (not Draft)
2. Verify all required ACF fields are filled
3. Check API is returning data:
   ```
   curl https://your-site.com/wp-json/wp/v2/service
   ```
4. Clear browser cache
5. Refresh backend API cache

### Images Not Showing

1. Check image was uploaded successfully
2. Verify Featured Image is set
3. Check image URL in HTML
4. Test in private/incognito browser window

### Changes Not Appearing

1. Wait 30 seconds for cache to clear
2. Force refresh browser (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser DevTools Network tab
4. Verify WordPress is responding: http://your-site.com/wp-json/

---

## 📱 Mobile Admin Access

The WordPress admin dashboard is fully responsive:

1. Access: `https://your-domain.com/wp-admin`
2. Login with credentials
3. Content management works on tablets and phones
4. Download WordPress mobile app for quick access

---

## 🔄 Content Sync Workflow

**Editing → Publishing → Frontend Updates (automatic)**

The workflow:
1. **Create/Edit** in WordPress Admin
2. **Publish** the post
3. **Backend API** fetches from WordPress REST API
4. **Frontend** displays updated content
5. **Automatic caching** for performance

---

## 📞 Technical Support

### For Backend/API Issues:
- Check backend is running: `curl http://localhost:3000/health`
- Check logs: `docker logs omnitratech-backend`
- Verify WordPress API: `curl http://localhost:8000/wp-json/wp/v2/service`

### For WordPress Issues:
- Check WordPress is running: `http://localhost:8000`
- Check plugin conflicts: Disable plugins one by one
- Check PHP error logs in hosting control panel

---

## 📚 Resources

- [WordPress Documentation](https://wordpress.org/support/)
- [Advanced Custom Fields Docs](https://www.advancedcustomfields.com/resources/)
- [WordPress REST API](https://developer.wordpress.org/rest-api/)
- [Lucide Icons](https://lucide.dev/)

---

**Last Updated**: 2026-04-09  
**Version**: 1.0
