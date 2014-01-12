EPLACE INTO wp_posts(
  ID
  , post_author
  , post_date, post_date_gmt
  , post_content
  , post_title
  #, post_category
  # , post_status
  , to_ping , pinged
  , post_modified, post_modified_gmt

)

SELECT
  p.id_article
  , u.id_auteur
  , p.date, p.date
  , concat(p.chapo, p.descriptif, p.texte)
  , titre
  #, p.id_rubrique
  , '', ''
  , p.date_modif, p.date_modif
FROM
  spip_articles AS p
  LEFT JOIN spip_auteurs_articles AS u ON u.id_article = p.id_article;