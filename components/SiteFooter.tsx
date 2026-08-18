// ponytail: shared footer — name left, email right. Every page gets the same
// exit, so subpages are never dead ends and contact stays consistent.
export function SiteFooter() {
  return (
    <footer className="flex justify-between px-3 py-8 font-sc text-[15px] md:px-7">
      <span>Ola Aduloju</span>
      <a href="mailto:subxmii@gmail.com" className="lnk-blr-hvr">
        Email
      </a>
    </footer>
  );
}
