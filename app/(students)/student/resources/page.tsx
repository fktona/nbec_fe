'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FileText, Download, ExternalLink } from 'lucide-react'

type Resource = {
  id: number
  title: string
  description: string
  type: 'PDF' | 'Video' | 'Link'
  url: string
}

export default function ResourcesPage() {
  const [resources, setResources] = useState<Resource[]>([])
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    // In a real application, you would fetch resources from an API
    setResources([
      { id: 1, title: 'UTME Study Guide', description: 'Comprehensive study guide for UTME preparation', type: 'PDF', url: '/resources/utme-study-guide.pdf' },
      { id: 2, title: 'Mathematics Formula Sheet', description: 'Quick reference for important math formulas', type: 'PDF', url: '/resources/math-formulas.pdf' },
      { id: 3, title: 'English Grammar Tutorial', description: 'Video tutorial on advanced English grammar', type: 'Video', url: 'https://example.com/english-grammar-video' },
      { id: 4, title: 'Online Science Encyclopedia', description: 'Comprehensive online resource for science topics', type: 'Link', url: 'https://example.com/science-encyclopedia' },
    ])
  }, [])

  const filteredResources = resources.filter(resource =>
    resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    resource.description.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Study Resources</h1>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search resources..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResources.map((resource) => (
          <Card key={resource.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                {resource.title}
              </CardTitle>
              <CardDescription>{resource.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" variant={resource.type === 'Link' ? 'outline' : 'default'}>
                {resource.type === 'PDF' && <Download className="mr-2 h-4 w-4" />}
                {resource.type === 'Video' && <ExternalLink className="mr-2 h-4 w-4" />}
                {resource.type === 'Link' && <ExternalLink className="mr-2 h-4 w-4" />}
                {resource.type === 'PDF' ? 'Download' : 'Open'}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

