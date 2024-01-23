const Layout = ({
  children,
  actionslot
}: {
  children: React.ReactNode,
  actionslot: React.ReactNode
}) => {
  return (
    <>
      {children}
      {actionslot}
    </>
  )
}

export default Layout;