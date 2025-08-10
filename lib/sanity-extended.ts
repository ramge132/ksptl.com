import { client } from './sanity'

// Landing Page 관련 함수
export interface LandingPage {
  _id: string
  _type: 'landingPage'
  heroTitle: string
  heroSubtitle: string
  heroButtonText: string
  introTitle: string
  introDescription: string
  whyChooseTitle: string
  whyChooseItems: Array<{
    title: string
    description: string
    icon: string
  }>
  timelineTitle: string
  timelineItems: Array<{
    year: string
    title: string
    description: string
  }>
  contactTitle: string
  contactDescription: string
  contactPhone: string
  contactEmail: string
}

export async function getLandingPage(): Promise<LandingPage | null> {
  try {
    const result = await client.fetch(`*[_type == "landingPage"][0]`)
    return result
  } catch (error) {
    console.error('Failed to fetch landing page:', error)
    return null
  }
}

export async function updateLandingPage(data: Partial<LandingPage>): Promise<LandingPage | null> {
  try {
    const existing = await getLandingPage()
    if (existing) {
      return await client.patch(existing._id).set(data).commit() as unknown as LandingPage
    } else {
      return await client.create({
        _id: 'landingPage-singleton',
        _type: 'landingPage',
        ...data
      }) as unknown as LandingPage
    }
  } catch (error) {
    console.error('Failed to update landing page:', error)
    return null
  }
}

// About Page 관련 함수
export interface AboutPage {
  _id: string
  _type: 'aboutPage'
  pageTitle: string
  pageSubtitle: string
  companyName: string
  companyDescription: string
  companyImage?: any
  visionTitle: string
  visionContent: string
  missionTitle: string
  missionContent: string
  businessTitle: string
  businessAreas: Array<{
    title: string
    description: string
    image?: any
  }>
  certificationsTitle: string
  certifications: Array<{
    name: string
    number: string
    issuer: string
    date: string
    image?: any
  }>
  headquarters: {
    address: string
    phone: string
    fax: string
  }
  testLab: {
    address: string
    phone: string
    fax: string
  }
}

export async function getAboutPage(): Promise<AboutPage | null> {
  try {
    const result = await client.fetch(`*[_type == "aboutPage"][0]`)
    return result
  } catch (error) {
    console.error('Failed to fetch about page:', error)
    return null
  }
}

export async function updateAboutPage(data: Partial<AboutPage>): Promise<AboutPage | null> {
  try {
    const existing = await getAboutPage()
    if (existing) {
      return await client.patch(existing._id).set(data).commit() as unknown as AboutPage
    } else {
      return await client.create({
        _id: 'aboutPage-singleton',
        _type: 'aboutPage',
        ...data
      }) as unknown as AboutPage
    }
  } catch (error) {
    console.error('Failed to update about page:', error)
    return null
  }
}

// Test Items 관련 함수
export interface TestItem {
  _id: string
  _type: 'testItem'
  category: string
  name: string
  description: string
  standards: string[]
  testPeriod: string
  price: string
  requiredDocuments: string[]
  order: number
  isActive: boolean
}

export async function getTestItems(): Promise<TestItem[]> {
  try {
    const result = await client.fetch(`*[_type == "testItem"] | order(order asc)`)
    return result || []
  } catch (error) {
    console.error('Failed to fetch test items:', error)
    return []
  }
}

export async function createTestItem(data: Omit<TestItem, '_id' | '_type'>): Promise<TestItem | null> {
  try {
    return await client.create({
      _type: 'testItem',
      ...data
    })
  } catch (error) {
    console.error('Failed to create test item:', error)
    return null
  }
}

export async function updateTestItem(id: string, data: Partial<TestItem>): Promise<TestItem | null> {
  try {
    return await client.patch(id).set(data).commit()
  } catch (error) {
    console.error('Failed to update test item:', error)
    return null
  }
}

export async function deleteTestItem(id: string): Promise<boolean> {
  try {
    await client.delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete test item:', error)
    return false
  }
}

// Support Page 관련 함수
export interface SupportPage {
  _id: string
  _type: 'supportPage'
  pageTitle: string
  pageSubtitle: string
  faqTitle: string
  faqItems: Array<{
    question: string
    answer: string
    category: string
  }>
  contactTitle: string
  contactDescription: string
  contactMethods: Array<{
    method: string
    value: string
    description: string
    availableTime: string
  }>
  noticeTitle: string
  notices: Array<{
    title: string
    content: string
    date: string
    isImportant: boolean
  }>
  downloadTitle: string
  downloadDescription: string
}

export async function getSupportPage(): Promise<SupportPage | null> {
  try {
    const result = await client.fetch(`*[_type == "supportPage"][0]`)
    return result
  } catch (error) {
    console.error('Failed to fetch support page:', error)
    return null
  }
}

export async function updateSupportPage(data: Partial<SupportPage>): Promise<SupportPage | null> {
  try {
    const existing = await getSupportPage()
    if (existing) {
      return await client.patch(existing._id).set(data).commit() as unknown as SupportPage
    } else {
      return await client.create({
        _id: 'supportPage-singleton',
        _type: 'supportPage',
        ...data
      }) as unknown as SupportPage
    }
  } catch (error) {
    console.error('Failed to update support page:', error)
    return null
  }
}

// Resources 관련 함수
export interface Resource {
  _id: string
  _type: 'resource'
  title: string
  category: string
  description: string
  file?: any
  fileSize: string
  downloadCount: number
  publishedDate: string
  isPublic: boolean
  order: number
}

export async function getResources(): Promise<Resource[]> {
  try {
    const result = await client.fetch(`*[_type == "resource"] | order(order asc)`)
    return result || []
  } catch (error) {
    console.error('Failed to fetch resources:', error)
    return []
  }
}

export async function createResource(data: Omit<Resource, '_id' | '_type'>): Promise<Resource | null> {
  try {
    return await client.create({
      _type: 'resource',
      ...data
    })
  } catch (error) {
    console.error('Failed to create resource:', error)
    return null
  }
}

export async function updateResource(id: string, data: Partial<Resource>): Promise<Resource | null> {
  try {
    return await client.patch(id).set(data).commit()
  } catch (error) {
    console.error('Failed to update resource:', error)
    return null
  }
}

export async function deleteResource(id: string): Promise<boolean> {
  try {
    await client.delete(id)
    return true
  } catch (error) {
    console.error('Failed to delete resource:', error)
    return false
  }
}
