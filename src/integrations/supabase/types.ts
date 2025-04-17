export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      chat_messages: {
        Row: {
          content: string
          created_at: string
          id: string
          read_at: string | null
          receiver_id: string
          sender_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          read_at?: string | null
          receiver_id: string
          sender_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          read_at?: string | null
          receiver_id?: string
          sender_id?: string
        }
        Relationships: []
      }
      courses: {
        Row: {
          buyer_id: string | null
          condition: string
          created_at: string | null
          description: string | null
          id: string
          materials_included: string[] | null
          original_price: number
          price: number
          seller_id: string | null
          status: string | null
          subject: string | null
          title: string
          updated_at: string | null
        }
        Insert: {
          buyer_id?: string | null
          condition: string
          created_at?: string | null
          description?: string | null
          id?: string
          materials_included?: string[] | null
          original_price: number
          price: number
          seller_id?: string | null
          status?: string | null
          subject?: string | null
          title: string
          updated_at?: string | null
        }
        Update: {
          buyer_id?: string | null
          condition?: string
          created_at?: string | null
          description?: string | null
          id?: string
          materials_included?: string[] | null
          original_price?: number
          price?: number
          seller_id?: string | null
          status?: string | null
          subject?: string | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          is_read: boolean | null
          receiver_id: string | null
          sender_id: string | null
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          is_read?: boolean | null
          receiver_id?: string | null
          sender_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "messages_receiver_id_fkey"
            columns: ["receiver_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "messages_sender_id_fkey"
            columns: ["sender_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          bio: string | null
          created_at: string
          full_name: string | null
          id: string
          is_tutor: boolean | null
          role: string | null
          updated_at: string
          username: string | null
        }
        Insert: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id: string
          is_tutor?: boolean | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Update: {
          avatar_url?: string | null
          bio?: string | null
          created_at?: string
          full_name?: string | null
          id?: string
          is_tutor?: boolean | null
          role?: string | null
          updated_at?: string
          username?: string | null
        }
        Relationships: []
      }
      sessions: {
        Row: {
          created_at: string | null
          end_time: string
          id: string
          rating: number | null
          review: string | null
          start_time: string
          status: Database["public"]["Enums"]["session_status"] | null
          student_id: string | null
          subject_id: string | null
          tutor_id: string | null
        }
        Insert: {
          created_at?: string | null
          end_time: string
          id?: string
          rating?: number | null
          review?: string | null
          start_time: string
          status?: Database["public"]["Enums"]["session_status"] | null
          student_id?: string | null
          subject_id?: string | null
          tutor_id?: string | null
        }
        Update: {
          created_at?: string | null
          end_time?: string
          id?: string
          rating?: number | null
          review?: string | null
          start_time?: string
          status?: Database["public"]["Enums"]["session_status"] | null
          student_id?: string | null
          subject_id?: string | null
          tutor_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "sessions_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "sessions_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      subjects: {
        Row: {
          category: string
          created_at: string | null
          description: string | null
          difficulty: Database["public"]["Enums"]["subject_difficulty"] | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          category: string
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["subject_difficulty"] | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          category?: string
          created_at?: string | null
          description?: string | null
          difficulty?: Database["public"]["Enums"]["subject_difficulty"] | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tutor_profiles: {
        Row: {
          availability: Json | null
          certifications: string[] | null
          created_at: string
          education_level: Database["public"]["Enums"]["education_level"] | null
          id: string
          institution: string | null
          rating: number | null
          review_count: number | null
          specialization: string | null
          teaching_philosophy: string | null
          updated_at: string
          years_of_experience: number | null
        }
        Insert: {
          availability?: Json | null
          certifications?: string[] | null
          created_at?: string
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          id: string
          institution?: string | null
          rating?: number | null
          review_count?: number | null
          specialization?: string | null
          teaching_philosophy?: string | null
          updated_at?: string
          years_of_experience?: number | null
        }
        Update: {
          availability?: Json | null
          certifications?: string[] | null
          created_at?: string
          education_level?:
            | Database["public"]["Enums"]["education_level"]
            | null
          id?: string
          institution?: string | null
          rating?: number | null
          review_count?: number | null
          specialization?: string | null
          teaching_philosophy?: string | null
          updated_at?: string
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_profiles_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      tutor_subjects: {
        Row: {
          created_at: string | null
          description: string | null
          hourly_rate: number
          subject_id: string
          tutor_id: string
          updated_at: string | null
          years_experience: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          hourly_rate: number
          subject_id: string
          tutor_id: string
          updated_at?: string | null
          years_experience?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          hourly_rate?: number
          subject_id?: string
          tutor_id?: string
          updated_at?: string | null
          years_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "tutor_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "tutor_subjects_tutor_id_fkey"
            columns: ["tutor_id"]
            isOneToOne: false
            referencedRelation: "tutor_profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_roles_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      is_admin: {
        Args: { user_id: string }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      course_condition: "like_new" | "good" | "fair"
      education_level: "high_school" | "bachelors" | "masters" | "phd" | "other"
      session_status: "scheduled" | "completed" | "cancelled"
      subject_difficulty: "beginner" | "intermediate" | "advanced"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      course_condition: ["like_new", "good", "fair"],
      education_level: ["high_school", "bachelors", "masters", "phd", "other"],
      session_status: ["scheduled", "completed", "cancelled"],
      subject_difficulty: ["beginner", "intermediate", "advanced"],
    },
  },
} as const
