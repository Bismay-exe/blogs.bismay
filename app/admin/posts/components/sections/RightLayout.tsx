'use client'

import React from 'react'
import PublishStatus from './rightLayout/PublishStatus'
import MetadataSettings from './rightLayout/MetadataSettings'
import SeoSettings from './rightLayout/SeoSettings'
import SaveActions from './rightLayout/SaveActions'
import { ProductionBlogPost } from '@/articles/format/articleData'

interface RightLayoutProps {
    article: ProductionBlogPost
    onUpdate: (updater: (prev: ProductionBlogPost) => ProductionBlogPost) => void
    onSave: () => void
    onReset: () => void
}

const RightLayout: React.FC<RightLayoutProps> = ({ article, onUpdate, onSave, onReset }) => {
    return (
        <div className="w-full lg:max-w-xs xl:max-w-sm space-y-5 pb-12 pt-6.5">
            <SaveActions
                article={article}
                onSaveToLocalStorage={onSave}
                onReset={onReset}
            />

            <PublishStatus
                status={article.status}
                slug={article.slug}
                isFeatured={article.settings.isFeatured}
                publishedAt={article.publishing?.publishedAt}
                scheduledAt={article.publishing?.scheduledAt}
                onStatusChange={(status) =>
                    onUpdate((prev) => ({
                        ...prev,
                        status,
                        publishing: {
                            ...prev.publishing,
                            ...(status === 'published' && !prev.publishing.publishedAt
                                ? { publishedAt: new Date().toISOString() }
                                : {}),
                        },
                    }))
                }
                onSlugChange={(slug) => onUpdate((prev) => ({ ...prev, slug }))}
                onFeaturedChange={(isFeatured) =>
                    onUpdate((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, isFeatured },
                    }))
                }
                onPublishedAtChange={(publishedAt) =>
                    onUpdate((prev) => ({
                        ...prev,
                        publishing: {
                            ...prev.publishing,
                            publishedAt,
                        },
                    }))
                }
                onScheduledAtChange={(scheduledAt) =>
                    onUpdate((prev) => ({
                        ...prev,
                        publishing: {
                            ...prev.publishing,
                            scheduledAt,
                        },
                    }))
                }
            />

            <MetadataSettings
                category={article.classification.category}
                excerpt={article.content.excerpt}
                seriesId={article.navigation.seriesId}
                seriesOrder={article.navigation.seriesOrder}
                relatedSlugs={article.navigation?.relatedSlugs || []}
                redirectFrom={article.navigation?.redirectFrom || []}
                onCategoryChange={(category) =>
                    onUpdate((prev) => ({
                        ...prev,
                        classification: { ...prev.classification, category },
                    }))
                }
                onExcerptChange={(excerpt) =>
                    onUpdate((prev) => ({
                        ...prev,
                        content: { ...prev.content, excerpt },
                    }))
                }
                onSeriesIdChange={(seriesId) =>
                    onUpdate((prev) => ({
                        ...prev,
                        navigation: { ...prev.navigation, seriesId },
                    }))
                }
                onSeriesOrderChange={(seriesOrder) =>
                    onUpdate((prev) => ({
                        ...prev,
                        navigation: { ...prev.navigation, seriesOrder },
                    }))
                }
                onRelatedSlugsChange={(relatedSlugs) =>
                    onUpdate((prev) => ({
                        ...prev,
                        navigation: { ...prev.navigation, relatedSlugs },
                    }))
                }
                onRedirectFromChange={(redirectFrom) =>
                    onUpdate((prev) => ({
                        ...prev,
                        navigation: { ...prev.navigation, redirectFrom },
                    }))
                }
            />

            <SeoSettings
                metaTitle={article.seo.metaTitle}
                metaDescription={article.seo.metaDescription}
                canonicalUrl={article.seo.canonicalUrl}
                ogTitle={article.seo.ogTitle}
                ogDescription={article.seo.ogDescription}
                ogImage={article.seo.ogImage}
                twitter={article.seo.twitter}
                robots={article.seo.robots}
                locale={article.seo.locale}
                onMetaTitleChange={(metaTitle) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, metaTitle } }))
                }
                onMetaDescriptionChange={(metaDescription) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, metaDescription } }))
                }
                onCanonicalUrlChange={(canonicalUrl) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, canonicalUrl } }))
                }
                onOgTitleChange={(ogTitle) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, ogTitle } }))
                }
                onOgDescriptionChange={(ogDescription) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, ogDescription } }))
                }
                onOgImageChange={(ogImage) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, ogImage } }))
                }
                onTwitterChange={(twitter) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, twitter } }))
                }
                onRobotsChange={(robots) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, robots } }))
                }
                onLocaleChange={(locale) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, locale } }))
                }
            />
        </div>
    )
}

export default RightLayout
