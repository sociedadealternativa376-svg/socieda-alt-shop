import { useState, useEffect, useCallback } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Copy, Check, Clock, QrCode, AlertCircle, ArrowLeft } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Skeleton } from "@/components/ui/skeleton"
import { toast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/AuthContext"
import { CartItem } from "@/types/product"

interface OrderData {
  items: CartItem[]
  total: number
  orderId: string
}

const PixCheckout = () => {

  const location = useLocation()
  const navigate = useNavigate()
  const { user, loading: authLoading } = useAuth()

  const orderData = location.state as OrderData | null

  const [timeLeft, setTimeLeft] = useState(600)
  const [pixCode, setPixCode] = useState("")
  const [pixImage, setPixImage] = useState("")
  const [paymentId, setPaymentId] = useState("")
  const [copied, setCopied] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [status, setStatus] = useState<"pending" | "paid" | "expired">("pending")

  // 🔐 Proteção rota
  useEffect(() => {

    if (!authLoading && !user) {
      navigate("/auth")
      return
    }

    if (!authLoading && user && !orderData) {
      navigate("/")
    }

  }, [user, authLoading, orderData, navigate])


  // 🚀 GERAR PIX
  useEffect(() => {

    if (!user || !orderData) return

    gerarPix()

  }, [user, orderData])


  // ⏱ TIMER
  useEffect(() => {

    if (status !== "pending" || timeLeft <= 0) return

    const interval = setInterval(() => {

      setTimeLeft(prev => {

        if (prev <= 1) {
          setStatus("expired")
          return 0
        }

        return prev - 1
      })

    }, 1000)

    return () => clearInterval(interval)

  }, [status, timeLeft])


  const formatTime = useCallback((seconds: number) => {

    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60

    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`

  }, [])


  // 📲 GERAR PIX BACKEND
  const gerarPix = async () => {

    try {

      setIsLoading(true)

      const response = await fetch("http://localhost:3000/pix", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          valor: orderData?.total,
          email: user?.email
        })
      })

      const data = await response.json()

      const pixData = data.point_of_interaction.transaction_data

      setPixCode(pixData.qr_code)
      setPixImage(pixData.qr_code_base64)
      setPaymentId(data.id)

    } catch (err) {

      console.error(err)

      toast({
        title: "Erro Pix",
        description: "Erro ao gerar pagamento Pix",
        variant: "destructive"
      })

    }

    setIsLoading(false)
  }


  // 📋 COPIAR PIX
  const handleCopyCode = async () => {

    try {

      await navigator.clipboard.writeText(pixCode)

      setCopied(true)

      toast({
        title: "Código copiado",
        description: "Cole no app do banco"
      })

      setTimeout(() => setCopied(false), 2000)

    } catch {

      toast({
        title: "Erro",
        description: "Não foi possível copiar",
        variant: "destructive"
      })

    }

  }


  // ✅ CONFIRMAR PAGAMENTO
  const handleConfirmPayment = async () => {

    try {

      const res = await fetch(`http://localhost:3000/pix/status/${paymentId}`)
      const data = await res.json()

      if (data.status === "approved") {

        setStatus("paid")

        toast({
          title: "Pagamento aprovado",
          description: "Pix confirmado"
        })

        setTimeout(() => {
          navigate("/checkout/sucesso", {
            state: orderData
          })
        }, 1200)

      } else {

        toast({
          title: "Ainda pendente",
          description: "Pagamento ainda não confirmado"
        })

      }

    } catch {

      toast({
        title: "Erro",
        description: "Erro ao verificar pagamento",
        variant: "destructive"
      })

    }

  }


  if (authLoading || !user || !orderData) return null


  const progress = (timeLeft / 600) * 100


  return (

    <div className="min-h-screen flex items-center justify-center p-4">

      <Card className="w-full max-w-md">

        <CardHeader className="text-center">

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/")}
            className="absolute left-4 top-4"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Voltar
          </Button>

          <CardTitle>Pagamento Pix</CardTitle>

        </CardHeader>


        <CardContent className="space-y-5">

          <div className="text-center text-sm">
            Pedido #{orderData.orderId}
          </div>


          {/* QR CODE */}
          <div className="flex justify-center">

            {isLoading ? (

              <Skeleton className="w-56 h-56 rounded-xl" />

            ) : (

              <div className="p-4 bg-white rounded-xl">

                <img
                  src={`data:image/png;base64,${pixImage}`}
                  className="w-48 h-48"
                />

              </div>

            )}

          </div>


          {/* TIMER */}
          {status === "pending" && (

            <div>

              <div className="flex justify-between text-sm mb-1">
                <span>Tempo restante</span>
                <span>{formatTime(timeLeft)}</span>
              </div>

              <Progress value={progress} />

            </div>

          )}


          {/* PIX COPIA */}
          <div className="space-y-2">

            <div className="text-xs break-all bg-muted p-2 rounded">
              {pixCode}
            </div>

            <Button
              onClick={handleCopyCode}
              disabled={isLoading}
              className="w-full"
            >
              {copied ? "Copiado ✅" : "Copiar código Pix"}
            </Button>

          </div>


          <Button
            variant="outline"
            onClick={handleConfirmPayment}
            disabled={status !== "pending"}
            className="w-full"
          >
            Já paguei
          </Button>

        </CardContent>

      </Card>

    </div>

  )
}

export default PixCheckout
