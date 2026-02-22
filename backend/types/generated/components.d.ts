import type { Schema, Struct } from '@strapi/strapi';

export interface BlocksAboutUs extends Struct.ComponentSchema {
  collectionName: 'components_blocks_about_uses';
  info: {
    displayName: 'about-us';
    icon: 'emotionHappy';
  };
  attributes: {
    descrip: Schema.Attribute.Text;
    descrip_1: Schema.Attribute.String;
    descrip_2: Schema.Attribute.String;
    descrip_3: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle_1: Schema.Attribute.Text;
    subtitle_2: Schema.Attribute.Text;
    subtitle_3: Schema.Attribute.Text;
    title: Schema.Attribute.String;
  };
}

export interface BlocksFaq extends Struct.ComponentSchema {
  collectionName: 'components_blocks_faqs';
  info: {
    displayName: 'faq';
    icon: 'attachment';
  };
  attributes: {
    faq_answer_1: Schema.Attribute.String;
    faq_question_1: Schema.Attribute.String;
  };
}

export interface BlocksHero extends Struct.ComponentSchema {
  collectionName: 'components_blocks_heroes';
  info: {
    displayName: 'hero';
    icon: 'alien';
  };
  attributes: {
    hero_cta_descrip: Schema.Attribute.Text;
    hero_descrip: Schema.Attribute.Text;
    hero_image: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios'
    >;
    hero_title: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'blocks.about-us': BlocksAboutUs;
      'blocks.faq': BlocksFaq;
      'blocks.hero': BlocksHero;
    }
  }
}
