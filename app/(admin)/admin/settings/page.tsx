'use client'

import { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export default function SettingsPage() {
  const [generalSettings, setGeneralSettings] = useState({
    schoolName: 'New Breed Educational Centre',
    adminEmail: 'admin@newbreed.edu',
    maxStudentsPerClass: 30,
    academicYear: '2023-2024',
    registrationOpen: true,
  })

  const [authSettings, setAuthSettings] = useState({
    requireEmailVerification: true,
    passwordMinLength: 8,
    allowSocialLogin: false,
  })

  const [staffSettings, setStaffSettings] = useState({
    allowStaffRegistration: false,
    staffApprovalRequired: true,
    staffRoles: ['Teacher', 'Administrator', 'Counselor'],
  })

  const [userSettings, setUserSettings] = useState({
    allowStudentRegistration: true,
    studentApprovalRequired: false,
    allowParentAccounts: true,
  })

  const handleGeneralChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setGeneralSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleAuthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target
    setAuthSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? parseInt(value) : value
    }))
  }

  const handleStaffChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setStaffSettings(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleUserChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setUserSettings(prev => ({
      ...prev,
      [name]: checked
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the settings to your backend
    console.log('Settings saved:', { generalSettings, authSettings, staffSettings, userSettings })
    alert('Settings saved successfully!')
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold text-gray-800">Admin Settings</h1>
      <Tabs defaultValue="general" className="w-full">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="auth">Authorization</TabsTrigger>
          <TabsTrigger value="staff">Staff</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>
        <form onSubmit={handleSubmit}>
          <TabsContent value="general" className="mt-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="schoolName">School Name</Label>
                <Input
                  id="schoolName"
                  name="schoolName"
                  value={generalSettings.schoolName}
                  onChange={handleGeneralChange}
                />
              </div>
              <div>
                <Label htmlFor="adminEmail">Admin Email</Label>
                <Input
                  id="adminEmail"
                  name="adminEmail"
                  type="email"
                  value={generalSettings.adminEmail}
                  onChange={handleGeneralChange}
                />
              </div>
              <div>
                <Label htmlFor="maxStudentsPerClass">Max Students Per Class</Label>
                <Input
                  id="maxStudentsPerClass"
                  name="maxStudentsPerClass"
                  type="number"
                  value={generalSettings.maxStudentsPerClass}
                  onChange={handleGeneralChange}
                />
              </div>
              <div>
                <Label htmlFor="academicYear">Academic Year</Label>
                <Input
                  id="academicYear"
                  name="academicYear"
                  value={generalSettings.academicYear}
                  onChange={handleGeneralChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="registrationOpen"
                  name="registrationOpen"
                  checked={generalSettings.registrationOpen}
                  onCheckedChange={(checked) => setGeneralSettings(prev => ({ ...prev, registrationOpen: checked }))}
                />
                <Label htmlFor="registrationOpen">Registration Open</Label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="auth" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="requireEmailVerification"
                  name="requireEmailVerification"
                  checked={authSettings.requireEmailVerification}
                  onCheckedChange={(checked) => setAuthSettings(prev => ({ ...prev, requireEmailVerification: checked }))}
                />
                <Label htmlFor="requireEmailVerification">Require Email Verification</Label>
              </div>
              <div>
                <Label htmlFor="passwordMinLength">Minimum Password Length</Label>
                <Input
                  id="passwordMinLength"
                  name="passwordMinLength"
                  type="number"
                  value={authSettings.passwordMinLength}
                  onChange={handleAuthChange}
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowSocialLogin"
                  name="allowSocialLogin"
                  checked={authSettings.allowSocialLogin}
                  onCheckedChange={(checked) => setAuthSettings(prev => ({ ...prev, allowSocialLogin: checked }))}
                />
                <Label htmlFor="allowSocialLogin">Allow Social Login</Label>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="staff" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowStaffRegistration"
                  name="allowStaffRegistration"
                  checked={staffSettings.allowStaffRegistration}
                  onCheckedChange={(checked) => setStaffSettings(prev => ({ ...prev, allowStaffRegistration: checked }))}
                />
                <Label htmlFor="allowStaffRegistration">Allow Staff Registration</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="staffApprovalRequired"
                  name="staffApprovalRequired"
                  checked={staffSettings.staffApprovalRequired}
                  onCheckedChange={(checked) => setStaffSettings(prev => ({ ...prev, staffApprovalRequired: checked }))}
                />
                <Label htmlFor="staffApprovalRequired">Staff Approval Required</Label>
              </div>
              <div>
                <Label>Staff Roles</Label>
                <div className="mt-2 space-y-2">
                  {staffSettings.staffRoles.map((role, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <Input value={role} readOnly />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="users" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowStudentRegistration"
                  name="allowStudentRegistration"
                  checked={userSettings.allowStudentRegistration}
                  onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, allowStudentRegistration: checked }))}
                />
                <Label htmlFor="allowStudentRegistration">Allow Student Registration</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="studentApprovalRequired"
                  name="studentApprovalRequired"
                  checked={userSettings.studentApprovalRequired}
                  onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, studentApprovalRequired: checked }))}
                />
                <Label htmlFor="studentApprovalRequired">Student Approval Required</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="allowParentAccounts"
                  name="allowParentAccounts"
                  checked={userSettings.allowParentAccounts}
                  onCheckedChange={(checked) => setUserSettings(prev => ({ ...prev, allowParentAccounts: checked }))}
                />
                <Label htmlFor="allowParentAccounts">Allow Parent Accounts</Label>
              </div>
            </div>
          </TabsContent>
          <div className="mt-6">
            <Button type="submit">Save All Settings</Button>
          </div>
        </form>
      </Tabs>
    </div>
  )
}

