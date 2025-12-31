"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Save, Upload } from "lucide-react"

export function BusinessSettings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-6">Business Profile</h2>

        <div className="space-y-6">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-lg bg-primary/10 flex items-center justify-center">
              <div className="w-20 h-20 rounded-lg bg-green-500 text-primary-foreground flex items-center justify-center font-bold text-2xl">
                AC
              </div>
            </div>
            <Button variant="outline" className="gap-2 bg-transparent">
              <Upload className="w-4 h-4" />
              Upload Logo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="company-name">Company Name</Label>
              <Input id="company-name" value="Acme Corporation" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="email">Business Email</Label>
              <Input id="email" type="email" value="hello@acme.com" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="phone">Business Phone</Label>
              <Input id="phone" value="+1 (555) 123-4567" className="mt-2" />
            </div>
            <div>
              <Label htmlFor="website">Website</Label>
              <Input id="website" value="https://acme.com" className="mt-2" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="address">Business Address</Label>
              <Input id="address" value="123 Business Ave, New York, NY 10001" className="mt-2" />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <Button onClick={handleSave} className="gap-2">
              <Save className="w-4 h-4" />
              {saved ? "Saved!" : "Save Changes"}
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}
