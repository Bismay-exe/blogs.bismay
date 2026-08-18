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
        <div className="w-full lg:max-w-xs xl:max-w-sm space-y-5 pb-12">
            <SaveActions
                article={article}
                onSaveToLocalStorage={onSave}
                onReset={onReset}
            />

            <PublishStatus
                status={article.status}
                slug={article.slug}
                isFeatured={article.settings.isFeatured}
                onStatusChange={(status) => onUpdate((prev) => ({ ...prev, status }))}
                onSlugChange={(slug) => onUpdate((prev) => ({ ...prev, slug }))}
                onFeaturedChange={(isFeatured) =>
                    onUpdate((prev) => ({
                        ...prev,
                        settings: { ...prev.settings, isFeatured },
                    }))
                }
            />

            <MetadataSettings
                category={article.classification.category}
                excerpt={article.content.excerpt}
                seriesId={article.navigation.seriesId}
                seriesOrder={article.navigation.seriesOrder}
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
            />

            <SeoSettings
                metaTitle={article.seo.metaTitle}
                metaDescription={article.seo.metaDescription}
                canonicalUrl={article.seo.canonicalUrl}
                ogImage={article.seo.ogImage}
                onMetaTitleChange={(metaTitle) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, metaTitle } }))
                }
                onMetaDescriptionChange={(metaDescription) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, metaDescription } }))
                }
                onCanonicalUrlChange={(canonicalUrl) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, canonicalUrl } }))
                }
                onOgImageChange={(ogImage) =>
                    onUpdate((prev) => ({ ...prev, seo: { ...prev.seo, ogImage } }))
                }
            />
        </div>
    )
}

export default RightLayout
