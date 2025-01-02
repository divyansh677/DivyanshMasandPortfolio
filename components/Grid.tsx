import React from 'react'
import { BentoGrid, BentoGridItem } from './ui/bentoGrid'
import { gridItems } from '@/data'

function Grid() {
  return (
  <section id ="about">
    <BentoGrid className='w-full py-20'>
        {
            gridItems.map(({
              id,title,description,className,img,
              imgClassName,titleClassName,spareImg
              })=>(
                <BentoGridItem
                id={id}
                title={title}
                key={id}
                description = {description}
                className={className}
                img = {img}
                imgClassName = {imgClassName}
                titleClassName={titleClassName}
                spareImg = {spareImg}
                
                />

                )
            )

        }
        
    </BentoGrid>




  </section>
  )
}

export default Grid
