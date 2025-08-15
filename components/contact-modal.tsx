"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { X, Check } from "lucide-react"

interface ContactModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const [formData, setFormData] = useState({
    recruiterName: "",
    jobTitle: "",
    jobDescription: "",
    additionalDetails: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "b264f840-7c45-475e-9249-da011f7cd7c4",
          name: formData.recruiterName,
          email: "rajdipcollege@gmail.com",
          subject: `New Job Opportunity: ${formData.jobTitle}`,
          message: `
Recruiter Name: ${formData.recruiterName}
Job Title: ${formData.jobTitle}

Job Description:
${formData.jobDescription}

Additional Details:
${formData.additionalDetails}
          `.trim(),
        }),
      })

      if (response.ok) {
        setShowSuccess(true)
        setFormData({
          recruiterName: "",
          jobTitle: "",
          jobDescription: "",
          additionalDetails: "",
        })

        // Hide success notification after 3 seconds
        setTimeout(() => {
          setShowSuccess(false)
          onClose()
        }, 3000)
      } else {
        console.error("Form submission failed")
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {showSuccess && (
        <div className="absolute inset-0 z-10 flex items-center justify-center">
          <div className="bg-slate-900 border border-red-500/50 rounded-lg p-8 shadow-2xl shadow-red-500/30 animate-in fade-in zoom-in duration-300">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                <Check className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-400">Message Sent Successfully!</h3>
                <p className="text-gray-300 mt-1">I&apos;ll get back to you soon.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal */}
      <div className="relative bg-slate-900 border border-red-900/30 rounded-lg p-6 w-full max-w-md mx-4 shadow-2xl shadow-red-500/20">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-red-400">Let&apos;s Connect</h2>
            <p className="text-gray-400 text-sm mt-1">I&apos;m excited to learn about your opportunity</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="text-gray-400 hover:text-white hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Recruiter Name</label>
            <Input
              name="recruiterName"
              value={formData.recruiterName}
              onChange={handleChange}
              placeholder="Your name"
              required
              className="bg-slate-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Job Title</label>
            <Input
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              placeholder="Position you're hiring for"
              required
              className="bg-slate-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Job Description</label>
            <Textarea
              name="jobDescription"
              value={formData.jobDescription}
              onChange={handleChange}
              placeholder="Brief description of the role and requirements"
              rows={4}
              required
              className="bg-slate-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Additional Details</label>
            <Textarea
              name="additionalDetails"
              value={formData.additionalDetails}
              onChange={handleChange}
              placeholder="Any other relevant information"
              rows={3}
              className="bg-slate-800 border-gray-600 text-white placeholder:text-gray-500 focus:border-red-500 focus:ring-red-500/20 resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-gray-600 text-gray-300 hover:bg-gray-700 hover:border-gray-500 bg-transparent"
            >
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
