sanitize.$inject = ['$sce'];

export default function sanitize($sce) {
  return (content) => {
    return $sce.trustAsHtml(content);
  }
}