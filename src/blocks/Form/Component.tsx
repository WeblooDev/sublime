'use client'
import type { FormFieldBlock, Form as FormType } from '@payloadcms/plugin-form-builder/types'

import { useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm, FormProvider } from 'react-hook-form'
import RichText from '@/components/RichText'
import { Button } from '@/components/ui/button'
import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'

import { fields } from './fields'
import { getClientSideURL } from '@/utilities/getURL'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

export type FormBlockType = {
  blockName?: string
  blockType?: 'formBlock'
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields,
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()
  const pathname = usePathname()

  const onSubmit = useCallback(
    (data: FormFieldBlock[]) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          const req = await fetch(`${getClientSideURL()}/api/form-submissions`, {
            body: JSON.stringify({
              form: formID,
              submissionData: dataToSend,
            }),
            headers: {
              'Content-Type': 'application/json',
            },
            method: 'POST',
          })

          const res = await req.json()

          clearTimeout(loadingTimerID)

          if (req.status >= 400) {
            setIsLoading(false)

            setError({
              message: res.errors?.[0]?.message || 'Internal Server Error',
              status: res.status,
            })

            return
          }

          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === 'redirect' && redirect) {
            const { url } = redirect

            const redirectUrl = url

            if (redirectUrl) router.push(redirectUrl)
          }
        } catch (err) {
          console.warn(err)
          setIsLoading(false)
          setError({
            message: 'Something went wrong.',
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="container  mt-[40px] md:mt-[70px] lg:mt-[100px] flex flex-col md:flex-row-reverse items-stretch h-full gap-10 my-20">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12" data={introContent} enableGutter={false} />
      )}
      <div id="forms" className="flex flex-col gap-10 w-full md:w-[50%]">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl md:text-4xl">Questions? Ready to order?</h1>
          <p className="text-base">
            Submit your information below and a personal rep will establish your account or answer
            any questions you may have
          </p>
        </div>
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === 'message' && (
            <RichText data={confirmationMessage} />
          )}
          {isLoading && !hasSubmitted && <p>Loading, please wait...</p>}
          {error && <div>{`${error.status || '500'}: ${error.message || ''}`}</div>}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default">
                {submitButtonLabel}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>

      {pathname === '/contact' ? (
        <div className="w-full md:w-[50%] !rounded-2xl bg-black text-white p-12 flex flex-col gap-20 justify-start relative overflow-hidden">
          {/* Text Block 1 */}
          <div>
            <h2 className="text-3xl  mb-2">Contact Information</h2>
            <p className="text-base text-[#C9C9C9]">Say something to start a live chat!</p>
          </div>

          {/* Icon + Label Blocks */}
          <div className="flex flex-col gap-8 mt-4">
            <div className="flex items-center gap-5">
              <Image src="/phone.svg" alt="phone" width={24} height={24} />
              <Link href="tel:+16578063298" className="font-light hover:underline">
                (657) 806 3298
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <Image src="/email.svg" alt="email" width={24} height={24} />
              <Link href="mailto:info@sublimevital.com" className="font-light hover:underline">
                info@sublimevital.com
              </Link>
            </div>
            <div className="flex items-center gap-5">
              <Image src="/loca.svg" alt="location" width={24} height={24} />
              <Link
                href="https://www.google.com/maps/place/Yorba+Linda,+CA"
                className="font-light hover:underline"
              >
                Yorba Linda, CA
              </Link>
            </div>
          </div>

          <Image
            src="/deco.png"
            alt="chat"
            width={1000}
            height={1000}
            className="w-auto h-auto absolute bottom-0 right-0"
          />
        </div>
      ) : (
        <div className="w-full md:w-[50%] !rounded-2xl">
          <Image
            src="/form.png"
            alt="form"
            width={600}
            height={700}
            className="h-[400px] md:h-[580px] w-full object-cover !rounded-[6px]"
          />
        </div>
      )}
    </div>
  )
}
