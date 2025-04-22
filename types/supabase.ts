export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          full_name: string
          email: string
          phone: string | null
          role: "seeker" | "provider" | "both"
          bio: string | null
          profile_image: string | null
          location: string | null
          created_at: string
        }
        Insert: {
          id?: string
          full_name: string
          email: string
          phone?: string | null
          role: "seeker" | "provider" | "both"
          bio?: string | null
          profile_image?: string | null
          location?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          full_name?: string
          email?: string
          phone?: string | null
          role?: "seeker" | "provider" | "both"
          bio?: string | null
          profile_image?: string | null
          location?: string | null
          created_at?: string
        }
      }
      skills: {
        Row: {
          id: string
          user_id: string
          skill_name: string
          intent: "teach" | "learn"
          category: string
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          skill_name: string
          intent: "teach" | "learn"
          category: string
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          skill_name?: string
          intent?: "teach" | "learn"
          category?: string
          created_at?: string
        }
      }
      availability_slots: {
        Row: {
          id: string
          provider_id: string
          date: string
          start_time: string
          end_time: string
          is_available: boolean
          created_at: string
        }
        Insert: {
          id?: string
          provider_id: string
          date: string
          start_time: string
          end_time: string
          is_available?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          provider_id?: string
          date?: string
          start_time?: string
          end_time?: string
          is_available?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          seeker_id: string | null
          provider_id: string | null
          slot_id: string | null
          service_name: string
          status: "pending" | "confirmed" | "completed" | "cancelled"
          payment_status: "unpaid" | "paid" | "offline"
          created_at: string
        }
        Insert: {
          id?: string
          seeker_id?: string | null
          provider_id?: string | null
          slot_id?: string | null
          service_name: string
          status: "pending" | "confirmed" | "completed" | "cancelled"
          payment_status: "unpaid" | "paid" | "offline"
          created_at?: string
        }
        Update: {
          id?: string
          seeker_id?: string | null
          provider_id?: string | null
          slot_id?: string | null
          service_name?: string
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          payment_status?: "unpaid" | "paid" | "offline"
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          booking_id: string
          reviewer_id: string | null
          rating: number
          comment: string | null
          created_at: string
        }
        Insert: {
          id?: string
          booking_id: string
          reviewer_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          booking_id?: string
          reviewer_id?: string | null
          rating?: number
          comment?: string | null
          created_at?: string
        }
      }
      admin_flags: {
        Row: {
          id: string
          type: "user" | "booking" | "review"
          item_id: string
          reason: string
          resolved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          type: "user" | "booking" | "review"
          item_id: string
          reason: string
          resolved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          type?: "user" | "booking" | "review"
          item_id?: string
          reason?: string
          resolved?: boolean
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}
