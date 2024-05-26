const MemeCard = ({imagePath, leadingMemetext, altImageText}:{imagePath: string, leadingMemeText: string, altImageText: string }) => {
  return (
    <div>
      <div>
        <img src={imagePath} alt={altImageText} />
      </div>
      <div className="leading-meme-text">
        {leadingMemeText}
      </div>
      
    </div>
  )
}

export default MemeCard;