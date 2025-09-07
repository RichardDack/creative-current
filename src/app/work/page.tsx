import type { Metadata } from 'next';
import { Layout } from '@/components/global/Layout';
import { generateCanonicalUrl } from '@/lib/seo/canonical';
import { workProjects, featuredProjects } from '@/lib/data/work-projects';

export const metadata: Metadata = {
  title: 'Our Work - Creative Current Web Design Portfolio',
  description: 'View our portfolio of web design and development projects for Dorset businesses. See examples of responsive websites, e-commerce solutions, and digital experiences we\'ve created.',
  keywords: 'web design portfolio, creative current work, dorset web design examples, website portfolio, web development projects',
  alternates: {
    canonical: generateCanonicalUrl('/work'),
  },
  openGraph: {
    title: 'Our Work - Creative Current Web Design Portfolio',
    description: 'View our portfolio of web design and development projects for Dorset businesses. See examples of responsive websites, e-commerce solutions, and digital experiences we\'ve created.',
    type: 'website',
    url: generateCanonicalUrl('/work'),
  },
};

// Get the first 2 featured projects (excluding CTA)
const topFeaturedProjects = featuredProjects.slice(0, 2);

// Get remaining projects for the grid (excluding the first 2 and CTA)
const gridProjects = featuredProjects.slice(2);

const services = [
  { title: 'Web Design', description: 'Beautiful, user-centered designs that convert visitors into customers' },
  { title: 'Development', description: 'Fast, secure, and scalable websites built with modern technologies' },
  { title: 'E-commerce', description: 'Complete online stores that drive sales and grow your business' },
  { title: 'SEO', description: 'Search engine optimization to help customers find your business' }
];

const testimonials = [
  {
    text: 'Creative Current transformed our online presence completely. Our bookings have increased by 200% since the new website launched.',
    author: 'Sarah Johnson',
    company: 'Swanage Holiday Cottages',
    rating: 5
  },
  {
    text: 'Professional, responsive, and delivered exactly what we needed. The team understood our vision perfectly.',
    author: 'Mark Thompson',
    company: 'Dorchester Engineering',
    rating: 5
  },
  {
    text: 'Outstanding service from start to finish. Our new e-commerce site has exceeded all expectations.',
    author: 'Lisa Chen',
    company: 'Weymouth Boutique',
    rating: 5
  }
];

export default function WorkPage() {
  return (
    <Layout>
      <div className="page-container">
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <div style={{ marginBottom: '4rem' }}>
              <h1 className="hero-title">
                Our Work
              </h1>
              <p className="hero-description">
                Discover the websites and digital experiences we've created for businesses 
                across Dorset and beyond. Each project tells a unique story.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Projects */}
        <section className="page-section">
          <div className="container">
            <div className="grid-responsive" style={{ 
              gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
              gap: '3rem',
              marginBottom: '4rem'
            }}>
              {topFeaturedProjects.map((project, index) => (
                <div key={project.id} style={{ display: 'flex', flexDirection: 'column' }}>
                  <div style={{ 
                    borderRadius: 'var(--radius-lg)', 
                    overflow: 'hidden', 
                    marginBottom: '1.5rem', 
                    aspectRatio: '16/9',
                    position: 'relative',
                    background: 'var(--color-background-lighter)'
                  }}>
                    <img 
                      src={project.image} 
                      alt={`${project.title} - ${project.category}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                      {project.tags?.map((tag, tagIndex) => (
                        <span key={tagIndex} style={{ 
                          padding: '0.25rem 0.75rem', 
                          background: 'var(--color-primary-200)', 
                          color: 'var(--color-primary)', 
                          fontSize: 'var(--font-size-sm)', 
                          borderRadius: 'var(--radius-full)',
                          fontWeight: 'var(--font-weight-medium)'
                        }}>{tag}</span>
                      ))}
                    </div>
                    <h3 style={{ 
                      fontSize: 'var(--font-size-2xl)', 
                      fontWeight: 'var(--font-weight-bold)', 
                      color: 'var(--color-text-primary)',
                      fontFamily: 'var(--font-display)'
                    }}>{project.title}</h3>
                    <p style={{ 
                      color: 'var(--color-text-muted)',
                      lineHeight: 'var(--line-height-relaxed)'
                    }}>
                      {project.description}
                    </p>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'space-between' 
                    }}>
                      <span style={{ 
                        fontSize: 'var(--font-size-sm)', 
                        color: 'var(--color-text-muted)' 
                      }}>Duration: {project.duration}</span>
                      <a href={project.link || '#'} className="link-hover" style={{ 
                        color: 'var(--color-primary)', 
                        fontWeight: 'var(--font-weight-semibold)',
                        textDecoration: 'none'
                      }}>
                        View Project →
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Project Grid */}
        <section style={{ 
          paddingTop: '4rem', 
          paddingBottom: '4rem', 
          paddingLeft: 'var(--space-lg)', 
          paddingRight: 'var(--space-lg)',
          background: 'var(--color-background-lighter)'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--font-size-3xl)', 
                fontWeight: 'var(--font-weight-bold)', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1.5rem' 
              }}>
                More Projects
              </h2>
              <p style={{ 
                fontSize: 'var(--font-size-xl)', 
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-relaxed)'
              }}>
                A selection of websites and digital solutions we've created for our clients
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {gridProjects.map((project, index) => (
                <div key={project.id} className="project-card" style={{ 
                  background: 'var(--color-background-darker)', 
                  borderRadius: 'var(--radius-lg)', 
                  overflow: 'hidden',
                  border: '1px solid var(--color-primary-200)'
                }}>
                  <div style={{ 
                    height: '12rem', 
                    overflow: 'hidden',
                    position: 'relative',
                    background: 'var(--color-background-lighter)'
                  }}>
                    <img 
                      src={project.image} 
                      alt={`${project.title} - ${project.category}`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        display: 'block'
                      }}
                    />
                  </div>
                  <div style={{ padding: '1.5rem' }}>
                    <div style={{ 
                      display: 'flex', 
                      flexWrap: 'wrap', 
                      gap: '0.5rem', 
                      marginBottom: '1rem' 
                    }}>
                      {project.tags?.slice(0, 3).map((tag, tagIndex) => (
                        <span key={tagIndex} style={{ 
                          padding: '0.125rem 0.5rem', 
                          background: 'var(--color-background-lighter)', 
                          color: 'var(--color-text-muted)', 
                          fontSize: 'var(--font-size-xs)', 
                          borderRadius: 'var(--radius-sm)' 
                        }}>{tag}</span>
                      ))}
                    </div>
                    <h3 style={{ 
                      fontSize: 'var(--font-size-lg)', 
                      fontWeight: 'var(--font-weight-bold)', 
                      color: 'var(--color-text-primary)', 
                      marginBottom: '0.5rem' 
                    }}>{project.title}</h3>
                    <p style={{ 
                      color: 'var(--color-text-muted)', 
                      fontSize: 'var(--font-size-sm)', 
                      marginBottom: '1rem',
                      lineHeight: 'var(--line-height-relaxed)'
                    }}>
                      {project.description}
                    </p>
                    <a href={project.link || '#'} className="link-hover" style={{ 
                      color: 'var(--color-primary)', 
                      fontSize: 'var(--font-size-sm)', 
                      fontWeight: 'var(--font-weight-semibold)',
                      textDecoration: 'none'
                    }}>
                      View Project →
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section style={{ 
          paddingTop: '4rem', 
          paddingBottom: '4rem', 
          paddingLeft: 'var(--space-lg)', 
          paddingRight: 'var(--space-lg)' 
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--font-size-3xl)', 
                fontWeight: 'var(--font-weight-bold)', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1.5rem' 
              }}>
                What We Do
              </h2>
              <p style={{ 
                fontSize: 'var(--font-size-xl)', 
                color: 'var(--color-text-muted)',
                lineHeight: 'var(--line-height-relaxed)'
              }}>
                We specialize in creating digital experiences that drive results
              </p>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
              gap: '2rem' 
            }}>
              {services.map((service, index) => (
                <div key={index} style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: '4rem', 
                    height: '4rem', 
                    background: 'var(--color-primary-200)', 
                    borderRadius: '50%', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 1rem' 
                  }}>
                    <div style={{ 
                      width: '2rem', 
                      height: '2rem', 
                      background: 'var(--color-primary)', 
                      borderRadius: 'var(--radius-sm)' 
                    }}></div>
                  </div>
                  <h3 style={{ 
                    fontSize: 'var(--font-size-lg)', 
                    fontWeight: 'var(--font-weight-bold)', 
                    color: 'var(--color-text-primary)', 
                    marginBottom: '0.5rem' 
                  }}>{service.title}</h3>
                  <p style={{ 
                    color: 'var(--color-text-muted)', 
                    fontSize: 'var(--font-size-sm)',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    {service.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section style={{ 
          paddingTop: '4rem', 
          paddingBottom: '4rem', 
          paddingLeft: 'var(--space-lg)', 
          paddingRight: 'var(--space-lg)',
          background: 'var(--color-background-lighter)'
        }}>
          <div className="container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 style={{ 
                fontFamily: 'var(--font-display)', 
                fontSize: 'var(--font-size-3xl)', 
                fontWeight: 'var(--font-weight-bold)', 
                color: 'var(--color-text-primary)', 
                marginBottom: '1.5rem' 
              }}>
                What Our Clients Say
              </h2>
            </div>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
              gap: '2rem' 
            }}>
              {testimonials.map((testimonial, index) => (
                <div key={index} style={{ 
                  background: 'var(--color-background-darker)', 
                  padding: '1.5rem', 
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--color-primary-200)'
                }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    marginBottom: '1rem' 
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      color: '#fbbf24' 
                    }}>
                      {'★'.repeat(testimonial.rating)}
                    </div>
                  </div>
                  <p style={{ 
                    color: 'var(--color-text-muted)', 
                    marginBottom: '1rem',
                    lineHeight: 'var(--line-height-relaxed)'
                  }}>
                    "{testimonial.text}"
                  </p>
                  <div style={{ 
                    fontWeight: 'var(--font-weight-semibold)', 
                    color: 'var(--color-text-primary)' 
                  }}>{testimonial.author}</div>
                  <div style={{ 
                    fontSize: 'var(--font-size-sm)', 
                    color: 'var(--color-text-muted)' 
                  }}>{testimonial.company}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section style={{ 
          paddingTop: '4rem', 
          paddingBottom: '4rem', 
          paddingLeft: 'var(--space-lg)', 
          paddingRight: 'var(--space-lg)' 
        }}>
          <div className="container" style={{ textAlign: 'center' }}>
            <h2 style={{ 
              fontFamily: 'var(--font-display)', 
              fontSize: 'var(--font-size-3xl)', 
              fontWeight: 'var(--font-weight-bold)', 
              color: 'var(--color-text-primary)', 
              marginBottom: '1.5rem' 
            }}>
              Ready to Start Your Project?
            </h2>
            <p style={{ 
              fontSize: 'var(--font-size-xl)', 
              color: 'var(--color-text-muted)', 
              marginBottom: '2rem',
              lineHeight: 'var(--line-height-relaxed)'
            }}>
              Let's create something amazing together. Get in touch to discuss your project.
            </p>
            <div style={{ 
              display: 'flex', 
              flexDirection: 'column', 
              gap: '1rem', 
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <a 
                href="/contact" 
                className="cta-button-primary"
                style={{ 
                  display: 'inline-block',
                  background: 'var(--color-primary)', 
                  color: 'white', 
                  padding: '1rem 2rem', 
                  borderRadius: 'var(--radius-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                Start Your Project
              </a>
              <a 
                href="/services" 
                className="cta-button-secondary"
                style={{ 
                  display: 'inline-block',
                  border: '1px solid var(--color-primary)', 
                  color: 'var(--color-primary)', 
                  padding: '1rem 2rem', 
                  borderRadius: 'var(--radius-lg)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease'
                }}
              >
                View Services
              </a>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}