import { gql } from "@apollo/client";

const PAGE_INFO_FRAGMENT = gql`
  fragment PageInfo on PageInfo {
    hasNextPage
    nextPageOffset
  }
`;

const LINK_FRAGMENT = gql`
  fragment Link on Link {
    id
    type
  }
`;

const BASIC_LABEL_FRAGMENT = gql`
  fragment BasicLabel on BasicLabel {
    __typename
    basicLabelType
    text
  }
`;

const DATE_PATTERN_LABEL_FRAGMENT = gql`
  fragment DatePatternLabel on DatePatternLabel {
    __typename
    dateForPattern {
      timestamp
    }
    pattern
    rounding
    type
  }
`;

const TIME_SENSITIVE_LABEL_FRAGMENT = gql`
  ${BASIC_LABEL_FRAGMENT}
  ${DATE_PATTERN_LABEL_FRAGMENT}
  fragment TimeSensitiveLabel on TimeSensitiveLabel {
    __typename
    spans {
      from {
        timestamp
      }
      to {
        timestamp
      }
      label {
        ...DatePatternLabel
        ...BasicLabel
      }
    }
  }
`;

const POSTER_LABEL_FRAGMENT = gql`
  ${BASIC_LABEL_FRAGMENT}
  ${TIME_SENSITIVE_LABEL_FRAGMENT}
  fragment PosterLabel on Label {
    ...TimeSensitiveLabel
    ...BasicLabel
  }
`;

const POSTER_LABELS_FRAGMENT = gql`
  ${POSTER_LABEL_FRAGMENT}
  fragment PosterLabels on PosterLabels {
    primary {
      ...PosterLabel
    }
    secondary {
      ...PosterLabel
    }
  }
`;

const METADATA_ITEM_FRAGMENT = gql`
  fragment MetadataItem on MetadataItem {
    ... on MetadataTextBadge {
      text
      textBadgeType
    }
    ... on MetadataItemString {
      text
    }
    ... on MetadataBadgeIMDB {
      text
      url
    }
  }
`;

const POSTER_LIST_PANEL_FRAGMENT = gql`
  ${LINK_FRAGMENT}
  ${METADATA_ITEM_FRAGMENT}
  ${POSTER_LABELS_FRAGMENT}
  ${PAGE_INFO_FRAGMENT}
  fragment PosterListPanel on PosterListPanel {
    id
    title
    kicker
    display {
      posterOrientation
      layout
      decoration
    }
    posters(config: $posterListPanelConfig) {
      id
      pageInfo {
        ...PageInfo
      }
      sortOptions {
        key
        selected
        title
        order
      }
      defaultScrollPosition
      refreshAt {
        timestamp
      }
      showMore {
        link {
          ...Link
        }
      }
      items {
        __typename
        id
        labels {
          ...PosterLabels
        }
        image {
          source
        }
        link {
          link {
            ...Link
          }
        }
        details {
          overlay {
            header
            metadataRowOne {
              ...MetadataItem
            }
          }
          hover {
            header
            metadataRowOne {
              ...MetadataItem
            }
            metadataRowTwo {
              ...MetadataItem
            }
          }
        }
      }
    }
  }
`;

export const getPageQuery = gql`
  ${POSTER_LIST_PANEL_FRAGMENT}
  query getPage(
    $pageId: String!
    $posterListPanelConfig: PosterListPanelInput
  ) {
    page(id: $pageId) {
      pagePanels {
        panels {
          ...PosterListPanel
        }
      }
    }
  }
`;
