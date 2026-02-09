'use client';

import React, { useState } from 'react';
import DashboardLayout from '@/components/dashboard/DashboardLayout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { 
  FileText, Upload, Search, Folder, 
  Download, Eye, Trash2, MoreVertical,
  File, FileImage, FileText as FileTextIcon, FileCode
} from 'lucide-react';

export default function ClientDocumentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFolder, setSelectedFolder] = useState('all');

  const folders = [
    { id: 'all', name: 'All Documents', count: 12 },
    { id: 'contracts', name: 'Contracts', count: 4 },
    { id: 'legal', name: 'Legal Documents', count: 5 },
    { id: 'personal', name: 'Personal', count: 2 },
    { id: 'misc', name: 'Miscellaneous', count: 1 },
  ];

  const documents = [
    {
      id: 1,
      name: 'Employment_Contract.pdf',
      type: 'pdf',
      size: '2.4 MB',
      uploaded: 'Mar 20, 2024',
      folder: 'contracts',
      lawyer: 'Sarah Johnson',
      status: 'signed',
    },
    {
      id: 2,
      name: 'Business_Formation_Agreement.docx',
      type: 'doc',
      size: '1.8 MB',
      uploaded: 'Mar 18, 2024',
      folder: 'legal',
      lawyer: 'Michael Chen',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Property_Deed.jpg',
      type: 'image',
      size: '4.2 MB',
      uploaded: 'Mar 15, 2024',
      folder: 'personal',
      lawyer: 'Maria Rodriguez',
      status: 'reviewed',
    },
    {
      id: 4,
      name: 'NDA_Agreement.pdf',
      type: 'pdf',
      size: '1.5 MB',
      uploaded: 'Mar 10, 2024',
      folder: 'contracts',
      lawyer: 'Sarah Johnson',
      status: 'signed',
    },
    {
      id: 5,
      name: 'Court_Transcript.txt',
      type: 'text',
      size: '0.8 MB',
      uploaded: 'Mar 5, 2024',
      folder: 'legal',
      lawyer: 'Robert Williams',
      status: 'archived',
    },
    {
      id: 6,
      name: 'Will_Document.pdf',
      type: 'pdf',
      size: '3.1 MB',
      uploaded: 'Feb 28, 2024',
      folder: 'legal',
      lawyer: 'Jennifer Park',
      status: 'signed',
    },
  ];

  const filteredDocuments = documents.filter(doc => {
    if (selectedFolder !== 'all' && doc.folder !== selectedFolder) return false;
    if (searchQuery && !doc.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'pdf': return <FileTextIcon className="h-8 w-8 text-red-500" />;
      case 'doc': return <FileText className="h-8 w-8 text-blue-500" />;
      case 'image': return <FileImage className="h-8 w-8 text-green-500" />;
      default: return <File className="h-8 w-8 text-gray-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const config = {
      signed: { variant: 'success' as const, label: 'Signed' },
      pending: { variant: 'warning' as const, label: 'Pending' },
      reviewed: { variant: 'secondary' as const, label: 'Reviewed' },
      archived: { variant: 'outline' as const, label: 'Archived' },
    };
    const { variant, label } = config[status as keyof typeof config] || { variant: 'outline' as const, label: status };
    return <Badge variant={variant}>{label}</Badge>;
  };

  const handleDownload = (id: number) => {
    console.log('Downloading document:', id);
    // API call placeholder
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this document?')) {
      console.log('Deleting document:', id);
      // API call placeholder
    }
  };

  return (
    <DashboardLayout userType="client">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Document Vault</h1>
            <p className="text-gray-600">Securely store and manage your legal documents</p>
          </div>
          <Button>
            <Upload className="h-4 w-4 mr-2" />
            Upload Document
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Documents</p>
                  <p className="text-2xl font-bold mt-2">12</p>
                </div>
                <div className="h-10 w-10 rounded-lg bg-black flex items-center justify-center">
                  <FileText className="h-5 w-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Signed</p>
                  <p className="text-2xl font-bold mt-2">8</p>
                </div>
                <Badge variant="success">Completed</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Pending Review</p>
                  <p className="text-2xl font-bold mt-2">3</p>
                </div>
                <Badge variant="warning">Action Required</Badge>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Storage Used</p>
                  <p className="text-2xl font-bold mt-2">13.8 MB</p>
                </div>
                <div className="text-sm text-gray-500">of 1 GB</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search & Filters */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  leftIcon={<Search className="h-4 w-4" />}
                />
              </div>
              <div className="flex space-x-2 overflow-x-auto pb-2">
                {folders.map((folder) => (
                  <button
                    key={folder.id}
                    onClick={() => setSelectedFolder(folder.id)}
                    className={`flex items-center px-4 py-2 rounded-lg whitespace-nowrap ${
                      selectedFolder === folder.id
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    <Folder className="h-4 w-4 mr-2" />
                    {folder.name}
                    <span className="ml-2 text-xs bg-white/20 px-1.5 py-0.5 rounded">
                      {folder.count}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Documents Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDocuments.map((doc) => (
            <Card key={doc.id} className="hover:shadow-md transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start justify-between mb-4">
                  {getFileIcon(doc.type)}
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleDownload(doc.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Download className="h-4 w-4 text-gray-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(doc.id)}
                      className="p-1 hover:bg-gray-100 rounded"
                    >
                      <Trash2 className="h-4 w-4 text-gray-500" />
                    </button>
                    <button className="p-1 hover:bg-gray-100 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-500" />
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold mb-2 truncate">{doc.name}</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Size</span>
                    <span className="font-medium">{doc.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uploaded</span>
                    <span className="font-medium">{doc.uploaded}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lawyer</span>
                    <span className="font-medium">{doc.lawyer}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Status</span>
                    {getStatusBadge(doc.status)}
                  </div>
                </div>
                
                <div className="mt-4 flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Download
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredDocuments.length === 0 && (
          <Card>
            <CardContent className="py-12 text-center">
              <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">No documents found</h3>
              <p className="text-gray-600 mb-6">
                {searchQuery 
                  ? 'No documents match your search'
                  : 'Upload your first document to get started'}
              </p>
              <Button>
                <Upload className="h-4 w-4 mr-2" />
                Upload Document
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Upload Tips */}
        <Card>
          <CardHeader>
            <CardTitle>Document Guidelines</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Maximum file size: 25MB per document</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Supported formats: PDF, DOC, DOCX, JPG, PNG, TXT</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>All documents are encrypted and stored securely</span>
              </li>
              <li className="flex items-start">
                <div className="h-2 w-2 rounded-full bg-black mt-2 mr-3"></div>
                <span>Share documents directly with your lawyer</span>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}